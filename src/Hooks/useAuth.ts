import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(null); // Postavi tip za user stanje
  const [error, setError] = useState<string | null>(null); // Postavi tip za error stanje
  const [loading, setLoading] = useState<boolean>(true); // Postavi tip za loading stanje

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const user = { email, password, name }; // Jednostavna simulacija korisnika
      localStorage.setItem('user', JSON.stringify(user));
      setUser(email); // Koristimo email kao identifikator korisnika
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email && user.password === password) {
          setUser(email);
          localStorage.setItem('loggedInUser', email); // Sprema prijavljenog korisnika
          setError(null);
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('No user found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return { user, error, loading, register, login, logout };
};
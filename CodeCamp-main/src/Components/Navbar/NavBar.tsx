import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Praćenje promjena u localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserEmail(JSON.parse(loggedInUser).email); // Postavljamo email korisnika
    }

    // Dodajemo event listener za lokalne promene u localStorage
    const handleStorageChange = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        setUserEmail(JSON.parse(loggedInUser).email);
      } else {
        setUserEmail(null); // Ako korisnik nije prijavljen, resetuj email
      }
    };

    window.addEventListener('storage', handleStorageChange); // Praćenje promjena u localStorage

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Čistimo event listener
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Brisanje podataka o prijavljenom korisniku
    setUserEmail(null); // Resetiranje email-a
    navigate('/'); // Preusmjeravanje na početnu stranicu
  };

  return (
    <nav>
      {userEmail ? ( // Ako je korisnik prijavljen, prikazujemo pozdrav i dugme za logout
        <>
          <h2>Pozdrav, {userEmail}!</h2>
          <button onClick={handleLogout}>Odjavi se</button>
        </>
      ) : (
        <h2>Dobrodošli! Niste prijavljeni.</h2> // Ako korisnik nije prijavljen, prikaži poruku
      )}
    </nav>
  );
};
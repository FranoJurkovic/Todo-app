import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate('/welcome'); // Preusmjeri prijavljenog korisnika na Welcome stranicu
    }
  }, [user, loading, navigate]);

  const handleNavigateToLogin = () => {
    navigate('/login'); // Putanja do stranice za prijavu
  };

  const handleNavigateToRegistration = () => {
    navigate('/register'); // Putanja do stranice za registraciju
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="left-section">
          <h1>Todo aplikacija</h1>
        </div>
        <div className="right-section">
          <button className="button" onClick={handleNavigateToLogin}>
            Prijava
          </button>
          <button className="button" onClick={handleNavigateToRegistration}>
            Registracija
          </button>
        </div>
      </nav>
      <div className="content">
        <hr />
        <div className="features">
          <h2>Zašto koristiti našu aplikaciju?</h2>
          <ul>
            <li>Jednostavno dodavanje i upravljanje zadacima</li>
            <li>Kategorizacija zadataka radi boljeg pregleda</li>
            <li>Pristup zadacima s bilo kojeg uređaja</li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Todo aplikacija. Sva prava pridržana.</p>
      </footer>
    </div>
  );
};

export default HomePage;
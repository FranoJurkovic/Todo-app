import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

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

      <h3 className='naslov'>Todo aplikacija je aplikacija koja služi za zapisivanje zadataka korisnika. Možete se jednostavno registrirati pa potom prijaviti i pisati svoje zadatke na vrlo jednostavan način.</h3>
      <hr />
    </div>
  );
};

export default HomePage;
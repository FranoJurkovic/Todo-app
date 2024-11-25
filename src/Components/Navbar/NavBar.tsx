import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

interface NavbarProps {
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    onLogout(); // Poziva funkciju odjave
    navigate('/'); // Preusmjeri na početnu stranicu
  };

  if (!user) return null; // Ako korisnik nije prijavljen, ne prikazuj ništa

  return (
    <nav>
      <h2>Pozdrav, {user}!</h2>
      <button onClick={handleLogout}>Odjavi se</button>
    </nav>
  );
};
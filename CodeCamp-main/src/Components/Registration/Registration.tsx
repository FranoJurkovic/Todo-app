import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration: FC = () => {
  const [name, setName] = useState<string>(""); // Korisničko ime
  const [email, setEmail] = useState<string>(""); // Email korisnika
  const [password, setPassword] = useState<string>(""); // Lozinka korisnika

  const navigate = useNavigate();

  // Funkcija za registraciju
  const handleRegister = () => {
    // Generiraj novi korisnički objekt s ID-om
    const newUser = { id: Date.now(), name, email, password };

    // Spremi korisnika u localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    // Nakon registracije preusmjeri na Login stranicu
    navigate("/login");
  };

  return (
    <div className="Registration">
      <h2>Registracija</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ime"
      /><br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lozinka"
      /><br />
      <button onClick={handleRegister}>Spremi podatke</button>
      <br />
      <button className="button" onClick={() => navigate('/login')}>
        Već imate račun? Prijavite se
      </button>
    </div>
  );
};

export default Registration;
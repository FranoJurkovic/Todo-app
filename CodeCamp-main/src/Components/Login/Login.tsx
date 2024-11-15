import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: FC = () => {
  const [email, setEmail] = useState<string>(""); // Prazan inicijalni email
  const [password, setPassword] = useState<string>(""); // Prazna inicijalna lozinka
  const navigate = useNavigate();

  // Funkcija za prijavu
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // Dohvati korisnika iz localStorage

    // Provjera emaila i lozinke
    if (user.email === email && user.password === password) {
      // Spremanje prijavljenog korisnika u localStorage
      const loggedInUser = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Preusmjeri na Welcome stranicu
      navigate("/welcome");
    } else {
      alert("Pogrešan email ili lozinka!");
    }
  };

  const handleNavigateToRegistration = () => {
    navigate('/register'); // Preusmjeri na stranicu za registraciju
  };

  return (
    <div className="Login">
      <h2>Prijava</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lozinka"
      />
      <button onClick={handleLogin}>Prijavi se</button>
      <button className="navigate-button" onClick={handleNavigateToRegistration}>
        Nemate račun? Registrirajte se
      </button>
    </div>
  );
};

export default Login;
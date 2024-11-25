import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../Hooks/useAuth";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>(""); // Prazan inicijalni email
  const [password, setPassword] = useState<string>(""); // Prazna inicijalna lozinka
  const [errorMessage, setErrorMessage] = useState<string>(""); // Poruka o grešci
  const navigate = useNavigate();

  const { login, error } = useAuth();

  // Funkcija za prijavu
  const handleLogin = async () => {
    try {
      await login(email, password);
      onLogin(email); // Pohrani korisničke podatke u App komponenti
      navigate("/welcome");
    } catch {
      setErrorMessage(error || "Pogrešan email ili lozinka!");
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleLogin}>Prijavi se</button>
      <button className="navigate-button" onClick={handleNavigateToRegistration}>
        Nemate račun? Registrirajte se
      </button>
    </div>
  );
};

export default Login;
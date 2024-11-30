import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { Navbar } from '../Navbar';
import { TaskList } from '../Task';

interface WelcomePageProps {
  onLogout: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setUser(savedUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); // Preusmjeri na login stranicu ako korisnik nije prijavljen
    }
  }, [loading, user, navigate]);

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Navigiraj na početnu stranicu
  };

  if (loading) return <p>Loading...</p>; // Dok se stanje učitava

  return (
    <div className="welcome-container">
      <Navbar onLogout={handleLogout} /> {/* Proslijedi ažuriranu funkciju odjave */}
      {user && <TaskList user={user} />} {/* Prikazuje listu zadataka i prosljeđuje korisnika */}
    </div>
  );
};

export default WelcomePage;
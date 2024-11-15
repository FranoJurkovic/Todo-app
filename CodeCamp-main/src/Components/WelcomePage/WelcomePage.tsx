import React from 'react';
import { TodoList } from '../Todo';
import { Navbar } from '../Navbar';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <Navbar />
      <TodoList /> {/* Prikazuje listu zadataka */}
    </div>
  );
};

export default WelcomePage;
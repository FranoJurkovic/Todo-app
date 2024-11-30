import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import HomePage from './Components/HomePage/HomePage';
import { useAuth } from './Hooks/useAuth';
import { TaskList } from './Components/Task';

export const App: React.FC = () => {
  const { user, login, logout } = useAuth(); // Koristimo useAuth kuku

  const handleLogin = (username: string) => {
    login(username, 'password');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/welcome" element={<WelcomePage onLogout={handleLogout} />} />
        {user && <Route path="/tasks" element={<TaskList user={user} />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
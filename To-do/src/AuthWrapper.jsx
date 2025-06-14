// src/AuthWrapper.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './pages/Login/AuthForm4';
import TodoContainer from './pages/To-do/components/TodoContainer';
import Layout from './pages/To-do/components/Layout';

export default function AuthWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('userData');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (storedToken && parsedUser) {
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error leyendo userData del localStorage:', err);
      navigate('/login');
    }
  }, [navigate]);

  const handleLoginSuccess = (newToken, userData) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userData', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/todos');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setToken('');
    setUser(null);
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout>
      <TodoContainer 
        token={token} 
        user={user} 
        onLogout={handleLogout} 
      />
    </Layout>
  );
}

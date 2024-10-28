import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Navigate to login page
    navigate('/login');
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;

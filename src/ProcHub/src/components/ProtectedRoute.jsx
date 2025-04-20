import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated (use your own logic here)
  // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Example check from localStorage
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8888/me', {
      credentials: 'include',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        setIsAuthenticated(true);
      }
      setAuthChecked(true);
    })
    .catch(() => {
      setAuthChecked(true);
    });
  }, []);
  if (!authChecked) {
    return <div>Loading...</div>
  }
  
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components (e.g., the Dashboard)
  return children;
};

export default ProtectedRoute;

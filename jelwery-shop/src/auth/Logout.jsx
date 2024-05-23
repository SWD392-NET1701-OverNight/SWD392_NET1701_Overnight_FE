import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('auth-token');
    navigate('/auth');
  }
  return (
    <button onClick={handleLogout} className="btn bg-green-400 text-white">
      Logout
    </button>
  );
}

export default Logout;

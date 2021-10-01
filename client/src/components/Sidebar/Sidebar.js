import './Sidebar.css';

import React from 'react';
import { Link } from 'react-router-dom';

const signOut = () => {
  localStorage.removeItem('auth-token');
};

function Sidebar({ username, isAuthenticated }) {
  return (
    <div id="sidebar" className="sidebar">
      <ul id="navigation" className="navigation">
        {isAuthenticated && (
          <Link to="/home">
            <li className="navigation-item">
              <i className="fas fa-home"></i>Home
            </li>
          </Link>
        )}
        {isAuthenticated && (
          <Link to={`/${username}`}>
            <li className="navigation-item">
              <i className="far fa-user"></i>Profile
            </li>
          </Link>
        )}
        {isAuthenticated && (
          <Link to="/login">
            <li className="navigation-item" onClick={signOut}>
              <i className="fas fa-sign-out-alt"></i>Sign Out
            </li>
          </Link>
        )}
        {!isAuthenticated && (
          <Link to="/login">
            <li className="navigation-item">
              <i className="fas fa-sign-in-alt"></i>Sign In
            </li>
          </Link>
        )}
      </ul>

      {isAuthenticated && (
        <div id="current-user" className="current-user">
          @{username}
        </div>
      )}
    </div>
  );
}

export default Sidebar;

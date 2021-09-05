import './Sidebar.css';

import React from 'react';
import { Link } from 'react-router-dom';

const signOut = () => {
  localStorage.removeItem('auth-token');
};

function Sidebar({ username }) {
  return (
    <div id="sidebar">
      <ul id="navigation">
        <Link to="/home">
          <li className="navigation-item">
            <i className="fas fa-home"></i>Home
          </li>
        </Link>
        <Link to={`/${username}`}>
          <li className="navigation-item">
            <i className="far fa-user"></i>Profile
          </li>
        </Link>
        <Link to="/login">
          <li className="navigation-item" onClick={signOut}>
            <i className="fas fa-sign-out-alt"></i>Sign Out
          </li>
        </Link>
      </ul>

      <div id="current-user">@{username}</div>
    </div>
  );
}

export default Sidebar;

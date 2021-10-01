import './Title.css';

import React from 'react';
import { useLocation } from 'react-router';
function Title() {
  const location = useLocation();
  const title = location.pathname.substring(1);

  return (
    <div className="title-container">
      <span className="title-text">{title}</span>
    </div>
  );
}

export default Title;

import './TweetWidget.css';

import React from 'react';
import { Link } from 'react-router-dom';

function TweetWidget({ content, username }) {
  return (
    <div id="tweet-widget">
      <Link to={`/${username}`}>
        <p id="username">@{username}</p>
      </Link>
      <p>{content}</p>
    </div>
  );
}

export default TweetWidget;

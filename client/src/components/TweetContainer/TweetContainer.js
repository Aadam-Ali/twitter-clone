import './TweetContainer.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TweetContainer({ user, content, username, id, likes }) {
  const [like, setLike] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes.includes(user.id));
  }, [user.id, likes]);

  const handleLike = (e) => {
    e.preventDefault();

    axios.put(
      `/api/${id}/like`,
      { userID: user.id, postID: id },
      {
        headers: { authorization: localStorage.getItem('auth-token') },
      }
    );
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="tweet-container">
      <Link to={`/${username}`}>
        <span id="username" className="username">
          @{username}
        </span>
      </Link>
      <p>{content}</p>
      <div className="actions-container">
        <div className="action like">
          {' '}
          <i
            className={`fas fa-heart like-button ${isLiked && 'liked'}`}
            onClick={handleLike}
          ></i>
          <span>{like}</span>
        </div>
        <div className="action delete">
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default TweetContainer;

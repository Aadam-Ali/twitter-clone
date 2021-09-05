import './FeedForm.css';

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function FeedForm({ user }) {
  const [content, setContent] = useState('');

  const history = useHistory();

  const handleContentChange = (e) => {
    const _content = e.target.value;
    setContent(_content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.replace(/\s+/g, '') === '') {
      return;
    }

    const token = localStorage.getItem('auth-token');

    axios
      .post(
        '/api/tweet',
        {
          content,
          username: user.username,
        },
        {
          headers: { authorization: token },
        }
      )
      .then(() => {
        history.push('/temp');
        history.goBack();
      })
      .catch((err) => console.log(err));

    setContent('');
  };

  return (
    <form id="feed-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's Happening?"
        maxLength="280"
      ></textarea>
      <button id="submit-tweet" type="submit">
        tweet
      </button>
    </form>
  );
}

export default FeedForm;

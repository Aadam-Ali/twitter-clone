import './UserFeed.css';

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import axios from 'axios';

import TweetContainer from '../TweetContainer/TweetContainer';
import Title from '../Title/Title';

function UserFeed({ user }) {
  const [tweets, setTweets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let isRendered = true;
    axios
      .get(`/api/tweets${location.pathname}`)
      .then((res) => {
        if (isRendered) {
          setTweets(res.data.reverse());
        }
      })
      .catch((err) => console.log(err.message));
    return () => {
      isRendered = false;
    };
  }, [location.pathname]);

  return (
    <div id="feed" className="feed">
      <Title />
      {tweets.map((el) => {
        return (
          <TweetContainer
            key={el._id}
            id={el._id}
            username={el.username}
            content={el.content}
            likes={el.likes}
            user={user}
          />
        );
      })}
    </div>
  );
}

export default UserFeed;

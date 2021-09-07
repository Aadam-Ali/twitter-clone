import './Feed.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import TweetWidget from './TweetWidget';
import FeedForm from './FeedForm';
import { useLocation } from 'react-router';

function ProfileFeed({ user }) {
  const [tweets, setTweets] = useState([]);
  const location = useLocation();

  let _isMounted = useRef(true);

  useEffect(() => {
    axios
      .get(`/api/tweets${location.pathname}`)
      .then((res) => {
        if (_isMounted.current) {
          setTweets(res.data.reverse());
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      _isMounted.current = false;
    };
  });

  return (
    <div id="feed">
      <FeedForm user={user} />
      {tweets.map((el) => {
        return (
          <TweetWidget
            key={el._id}
            id={el._id}
            username={el.username}
            content={el.content}
          />
        );
      })}
    </div>
  );
}

export default ProfileFeed;

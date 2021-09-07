import './Feed.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import TweetWidget from './TweetWidget';
import FeedForm from './FeedForm';

function Feed({ user, getToken }) {
  const [tweets, setTweets] = useState([]);

  let _isMounted = useRef(true);

  useEffect(() => {
    axios
      .get('/api/tweets')
      .then((res) => {
        if (_isMounted.current) {
          setTweets(res.data.reverse());
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <div id="feed">
      <FeedForm user={user} getToken={getToken} />
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

export default Feed;

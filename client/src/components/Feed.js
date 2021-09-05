import './Feed.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TweetWidget from './TweetWidget';
import FeedForm from './FeedForm';

function Feed({ user, getToken }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tweets')
      .then((res) => setTweets(res.data.reverse()))
      .catch((err) => console.log(err.message));
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

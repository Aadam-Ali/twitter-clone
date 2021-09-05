import './Feed.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TweetWidget from './TweetWidget';
import FeedForm from './FeedForm';
import { useLocation } from 'react-router';

function ProfileFeed({ user }) {
  const [tweets, setTweets] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`/api/tweets${location.pathname}`)
      .then((res) => setTweets(res.data.reverse()))
      .catch((err) => console.log(err.message));
  }, []);

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

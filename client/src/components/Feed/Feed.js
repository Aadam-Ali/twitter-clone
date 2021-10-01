import './Feed.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TweetContainer from '../TweetContainer/TweetContainer';
import TweetForm from '../TweetForm/TweetForm';
import Title from '../Title/Title';

function Feed({ user, getToken }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    let isRendered = true;
    axios
      .get('/api/tweets')
      .then((res) => {
        if (isRendered) {
          setTweets(res.data.reverse());
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      isRendered = false;
    };
  }, []);

  return (
    <div id="feed" className="feed">
      <Title />
      <TweetForm user={user} getToken={getToken} />
      {tweets.map((el) => {
        return (
          <TweetContainer
            user={user}
            key={el._id}
            id={el._id}
            username={el.username}
            content={el.content}
            likes={el.likes}
          />
        );
      })}
    </div>
  );
}

export default Feed;

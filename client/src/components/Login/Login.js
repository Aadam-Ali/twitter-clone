import './Login.css';

import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ setUser, setToken, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      axios
        .post(
          '/api/jwtLogin',
          {},
          { headers: { authorization: localStorage.getItem('auth-token') } }
        )
        .then((res) => {
          const user = res.data;
          setUser({ id: user.id, username: user.username });
          setIsAuthenticated(true);
          history.push('/home');
        });
    }
  });

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/login', {
        username,
        password,
      })
      .then((res) => {
        setToken(res.data.accessToken);
        if (res.status === 200) {
          setUser({ id: res.data.id, username: res.data.username });
          setIsAuthenticated(true);
          history.push('/home');
        }
      });
    return <Redirect to={{ pathname: '/home' }} />;
  };

  return (
    <div className="form-login-container">
      <form className="form form-login" onSubmit={handleLoginSubmit}>
        <h1 className="title">Sign In</h1>
        <p className="message">
          Do not have an account? <Link to="/register">Register</Link>
        </p>
        <input
          className="form-control"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          required
        ></input>
        <input
          className="form-control"
          name="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        ></input>
        <button className="submit-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default Login;

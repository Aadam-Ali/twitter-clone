import './Login.css';

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function Login({ setUser, setToken, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('');

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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== confirmRegisterPassword) return;
    axios
      .post('/api/register', {
        username: registerUsername,
        password: registerPassword,
      })
      .then()
      .catch();

    setRegisterUsername('');
    setRegisterPassword('');
    setConfirmRegisterPassword('');
  };

  const handleRegisterUsernameChange = (e) => {
    setRegisterUsername(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleConfirmRegisterPasswordChange = (e) => {
    setConfirmRegisterPassword(e.target.value);
  };

  return (
    <div id="form">
      <form className="form form-login" onSubmit={handleLoginSubmit}>
        <h1>Sign In</h1>
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
      <form className="form form-register" onSubmit={handleRegisterSubmit}>
        <h1>Register</h1>
        <input
          className="form-control"
          name="username"
          placeholder="username"
          value={registerUsername}
          onChange={handleRegisterUsernameChange}
          required
        ></input>
        <input
          className="form-control"
          name="password"
          placeholder="password"
          type="password"
          value={registerPassword}
          onChange={handleRegisterPasswordChange}
          required
        ></input>
        <input
          className="form-control"
          name="confirm-password"
          placeholder="confirm password"
          type="password"
          value={confirmRegisterPassword}
          onChange={handleConfirmRegisterPasswordChange}
          required
        ></input>
        <button className="submit-btn" type="submit">
          register
        </button>
      </form>
    </div>
  );
}

export default Login;

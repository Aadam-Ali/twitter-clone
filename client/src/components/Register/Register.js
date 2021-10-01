import './Register.css';

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;
    axios
      .post('/api/register', {
        username: username,
        password: password,
      })
      .then()
      .catch();

    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="form-register-container">
      <form className="form form-register" onSubmit={handleRegisterSubmit}>
        <h1 className="title">Register</h1>
        <p className="message">
          Already have an account? <Link to="/login">Login</Link>
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
        <input
          className="form-control"
          name="confirm-password"
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        ></input>
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

import './App.css';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Feed from './components/Feed/Feed';
import UserFeed from './components/UserFeed/UserFeed';

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setTokenLocalStorage = (token) => {
    localStorage.setItem('auth-token', `Bearer ${token}`);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login
            setUser={setUser}
            setIsAuthenticated={setIsAuthenticated}
            setToken={setTokenLocalStorage}
          />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          {isAuthenticated === false && (
            <Redirect to={{ pathname: '/login' }} />
          )}
          <div id="Home">
            <Sidebar
              username={user.username}
              isAuthenticated={isAuthenticated}
            />
            <Feed user={user} />
          </div>
        </Route>
        <Route path="/:username">
          <div id="Profile">
            <Sidebar
              username={user.username}
              isAuthenticated={isAuthenticated}
            />
            <UserFeed user={user} />
          </div>
        </Route>
        <Route exact path="/">
          <Redirect to={{ pathname: '/login' }} />
        </Route>
        <Route>
          <Redirect to={{ pathname: '/login' }} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

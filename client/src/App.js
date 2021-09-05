import './App.css';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ProfileFeed from './components/ProfileFeed';
import Login from './components/Login';

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
        <Route path="/home">
          {isAuthenticated === false && (
            <Redirect to={{ pathname: '/login' }} />
          )}
          <div id="Home">
            <Sidebar username={user.username} />
            <Feed user={user} />
          </div>
        </Route>
        <Route path="/:username">
          <div id="Profile">
            <Sidebar username={user.username} />
            <ProfileFeed user={user} />
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

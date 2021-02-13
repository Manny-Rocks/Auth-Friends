import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <Router>
    <div className="App">
    <ul className="nav">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Friends List</Link>
          </li>
        </ul>
        <Route path="/login" render={(props)=><Login {...props}/>} />
        <PrivateRoute exact path="/protected" component={FriendsList} />
    </div>
    </Router>
  );
}

export default App;
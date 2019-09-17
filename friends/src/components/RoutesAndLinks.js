import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Login from './Login.js';
import PrivateRoute from './PrivateRoute.js';
import FriendsList from './FriendsList.js';

const NavLinks = () => {
  return (
    <div className='routes-and-links'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/friends'>Friends List</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/' component={null} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/friends' component={FriendsList} />
      </Switch>
    </div>
  );
};

export default NavLinks;
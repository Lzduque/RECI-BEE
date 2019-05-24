import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';

class Welcome extends Component {
  render() {
    return (
      <Router>
      <div>
        <div>
        <p>Welcome Page</p>
        </div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <hr />

        <Route path="/about" component={Login} />
        <Route path="/topics" component={Signup} />
      </div>
    </Router>
    )
  }
};

export default Welcome;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
import { Redirect } from 'react-router-dom'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  renderRedirect = () => {
    this.setState({ redirect: true })
  }

  render() {
    function toggleSignup() {
      document.getElementById("login-toggle").style.backgroundColor="#fff";
      document.getElementById("login-toggle").style.color="#222";
      document.getElementById("signup-toggle").style.backgroundColor="#57b846";
      document.getElementById("signup-toggle").style.color="#fff";
      document.getElementById("login-form").style.display="none";
      document.getElementById("signup-form").style.display="block";
    }

    function toggleLogin() {
      document.getElementById("login-toggle").style.backgroundColor="#57B846";
      document.getElementById("login-toggle").style.color="#fff";
      document.getElementById("signup-toggle").style.backgroundColor="#fff";
      document.getElementById("signup-toggle").style.color="#222";
      document.getElementById("signup-form").style.display="none";
      document.getElementById("login-form").style.display="block";
    }

    if (this.state.redirect) {
      return <Redirect to='/recipebook' />
    }

    return (
      <Router>
      <div className="form-modal">
        <div className="form-toggle">
            <button id="login-toggle" onClick={() => toggleLogin()}>log in</button>
            <button id="signup-toggle" onClick={() => toggleSignup()}>sign up</button>
        </div>
        <div id="login-form">
            <form>
                <input type="email" placeholder="Enter email"/>
                <input type="password" placeholder="Enter password"/>
                <button type="button" className="btn login" onClick={ () => this.renderRedirect() }>login</button>
                <hr/>
            </form>
        </div>
        <div id="signup-form">
            <form>
                <input type="email" placeholder="Enter your email"/>
                <input type="text" placeholder="Choose username"/>
                <input type="password" placeholder="Create password"/>
                <button type="button" className="btn signup" onClick={ () => this.renderRedirect() }>create account</button>
                {/* <p>Clicking <strong>create account</strong> means that you are agree to our <a href="javascript:void(0)">terms of services</a>.</p> */}
                <hr/>
            </form>
        </div>
      </div>

      {/* <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>

      <hr />

      <Route path="/about" component={Login} />
      <Route path="/topics" component={Signup} /> */}
    </Router>
    )
  }
};

export default Welcome;

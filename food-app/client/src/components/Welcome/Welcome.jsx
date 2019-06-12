import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
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

    // all styles match the css index file!!! CAUTION!
    function toggleSignup() {
      document.getElementById("login-toggle").style.backgroundColor="rgb(231, 231, 231)";
      document.getElementById("login-toggle").style.color="black";
      document.getElementById("signup-toggle").style.backgroundColor="goldenrod";
      document.getElementById("signup-toggle").style.color="white";
      document.getElementById("login-form").style.display="none";
      document.getElementById("signup-form").style.display="block";
    }

    function toggleLogin() {
      document.getElementById("login-toggle").style.backgroundColor="goldenrod";
      document.getElementById("login-toggle").style.color="white";
      document.getElementById("signup-toggle").style.backgroundColor="rgb(231, 231, 231)";
      document.getElementById("signup-toggle").style.color="black";
      document.getElementById("signup-form").style.display="none";
      document.getElementById("login-form").style.display="block";
    }

    if (this.state.redirect) {
      return <Redirect to='/recipebook' />
    }

    return (
      <Router>
      <div>
        <div className="catch-phrase">
          <h4>
          Save your recipes, choose from our catalog, and create your personalized meal plan!          </h4>
        </div>
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
            </form>
          </div>
          <div id="signup-form">
            <form>
              <input type="email" placeholder="Enter your email"/>
              <input type="text" placeholder="Choose username"/>
              <input type="password" placeholder="Create password"/>
              <button type="button" className="btn signup" onClick={ () => this.renderRedirect() }>create account</button>
            </form>
          </div>
        </div>
      </div>
    </Router>
    )
  }
};

export default Welcome;

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Notice how the URL does not include the base localhost:3001. That's because, as noted earlier, we want this request to be made to the Webpack development server. Thanks to the configuration established by create-react-app, the Webpack dev server will infer what traffic to proxy. It will proxy a request if the URL is not recognized or if the request is not loading static assets (like HTML/CSS/JS).
// function search(query) {
//   return fetch(`/api/food?q=${query}`, {
//       accept: 'application/json',
//     }).then(checkStatus)
//     .then(parseJSON);
// }
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user: null
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value, 'evttarget');
    console.log('state', this.state.name);
    this.setState({
      name: event.target.value
    });
    console.log('handlechange');
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('A name was submitted: ' + this.state.name);

    const search = (name, callback) => {
      return fetch(`/api/users?name=${name}`, {
          accept: 'application/json',
        }).then(checkStatus)
        .then( (response) => {
          return response.json();
        })
        .then(callback)
    };

    search(this.state.name, (user) => {
      console.log(user);
      this.setState({
        user
      });
    });
    console.log('handlesubmit')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name={ this.state.name } onChange={ this.handleChange } />
          </label>
          <input type="submit" value="Submit" />
          </form>
        </div>
        {this.state.user ? <p>Hello{this.state.user.id}</p> : null }
      </div>
    );
  }
}

export default App;

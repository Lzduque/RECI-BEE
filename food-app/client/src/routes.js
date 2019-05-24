import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Welcome from './components/Welcome/Welcome.jsx';
import Profile from './components/Profile/Profile.jsx';
import RecipeBook from './components/RecipeBook/RecipeBook.jsx';
import MealPlan from './components/MealPlan/MealPlan.jsx';

class Routes extends Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // }

  constructor (props) {
    super(props);
    // const { cookies } = props;
    // this.state = {
    //   id: cookies.get('id') || '0'
    // }
  }

  // componentDidMount() {
  //   if (this.state.id === '0') {
  //     let id = 1; // Changes when there are multiple users
  //     const { cookies } = this.props;

  //     cookies.set('id', id, { path: '/' });
  //     this.setState({ id });
  //   }
  // }

  render() {
    return (
      <Router>
      <div>
        <ul>
          <Link to="/">Welcome</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/recipebook">RecipeBook</Link>
          <Link to="/mealplan">MealPlan</Link>
        </ul>

        <hr />

        <Route exact path="/" component={Welcome} />
        <Route path="/profile" component={Profile} />
        <Route path="/recipebook" component={RecipeBook} />
        <Route path="/mealplan" component={MealPlan} />
      </div>
    </Router>
    )
  }
};

export default Routes;

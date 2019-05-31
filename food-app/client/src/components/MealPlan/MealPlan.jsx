import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class MealPlan extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   breakfastPopup: false,
    //   lunchPopup: false,
    //   dinnerPopup: false,
    //   snackPopup: false
    // }
    // this.breakfastToggle = this.breakfastToggle.bind(this);
    // this.lunchToggle = this.lunchToggle.bind(this);
    // this.dinnerToggle = this.dinnerToggle.bind(this);
    // this.snackToggle = this.snackToggle.bind(this);
  }

  // breakfastToggle() {
  //   this.setState({ breakfastPopup: true })
  //   console.log(this.state.breakfastPopup);
  // }
  render() {
    return (
      <Router>
      <div>
        <div className="nav-bar">
        </div>
        <br/>
        <div className="create-recipe container-1">
          <div className="container-1-box page-title">
            <h1 className="page-title">Meal Plan Page</h1>
          </div>
        </div>
        <hr />
        <br/>
        <h3>Select Meals for the Day</h3>
        <br/>
        <br/>
        <h2>BREAKFAST</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}} onClick={ this.breakfastToggle }>+</button>
        <br/>
        <br/>
        <h2>LUNCH</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}}>+</button>
        <br/>
        <br/>
        <h2>DINNER</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}}>+</button>
        <br/>
        <br/>
        <h2>SNACK</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}}>+</button>
      </div>
    </Router>
    )
  }
};

export default MealPlan;


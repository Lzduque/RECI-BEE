import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MealPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showRecipes: [],
      showRecipesByID: null,
      recipeType: ""
    }
    this.typeToggle = this.typeToggle.bind(this);
  };

  typeToggle = (type) => {
    this.setState({ recipeType: type }, () => {
      console.log("fetch begins")

      fetch(`/api/books/search?type=${this.state.recipeType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response is happening")
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something bad');
        }
      })
      .then(data => {
        const recipes = data.map( x => x.recipe)
        this.setState({
          showPopup: true,
          showRecipes: recipes,
          showRecipesByID: recipes.reduce(
            (acc, item) => Object.assign(acc, {
              [item.id]: item
            }), {})
        })
      })
      .catch(error => this.setState({ error }))
      .then(() => console.log("end of fetch", "show", this.state.showRecipes, "showID", this.state.showRecipesByID, this.state.showPopup));
    })
  }

  render() {
    // console.log(this.state.typePopup);

    return (
      // <Router>
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
          color: 'blue'}} onClick={() => this.typeToggle('breakfast')}>+</button>
        <br/>
        <br/>
        <h2>LUNCH</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}} onClick={() => this.typeToggle('meal')}>+</button>
        <br/>
        <br/>
        <h2>DINNER</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}} onClick={() => this.typeToggle('meal')}>+</button>
        <br/>
        <br/>
        <h2>SNACK</h2>
        <br/>
        <button style={{
          backgroundColor: 'white',
          color: 'blue'}} onClick={() => this.typeToggle('snack')}>+</button>
      </div>
    // </Router>
    )
  }
};

export default MealPlan;


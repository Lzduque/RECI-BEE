import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShoppingList from './ShoppingList/ShoppingList.jsx';
import RecipeChoice from './RecipeChoice/RecipeChoice.jsx';

class MealPlan extends Component {
  render() {
    return (
      <Router>
      <div>
        <div>
        <p>Meal Plan Page</p>
        </div>
        <ul>
          <li>
            <Link to="/shopping-list">Shopping List</Link>
          </li>
          <li>
            <Link to="/recipe/choice">Recipe Choice</Link>
          </li>
        </ul>

        <hr />

        <Route path="/shopping-list" component={ShoppingList} />
        <Route path="/recipe/choice" component={RecipeChoice} />
      </div>
    </Router>
    )
  }
};

export default MealPlan;

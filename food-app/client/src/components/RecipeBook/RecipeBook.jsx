import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateRecipe from './CreateRecipe/CreateRecipe.jsx';
import ViewRecipe from './ViewRecipe/ViewRecipe.jsx';

class RecipeBook extends Component {
  render() {
    return (
      <Router>
      <div>
        <div>
        <p>Recipe Book Page</p>
        </div>
        <ul>
          <li>
            <Link to="/recipe/create">Create Recipe</Link>
          </li>
          <li>
            <Link to="/recipe/view">View Recipe</Link>
          </li>
        </ul>

        <hr />

        <Route path="/recipe/create" component={CreateRecipe} />
        <Route path="/recipe/view" component={ViewRecipe} />
      </div>
    </Router>
    )
  }
};

export default RecipeBook;

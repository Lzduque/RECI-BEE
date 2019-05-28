import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateRecipe from './CreateRecipe/CreateRecipe.jsx';
import ViewRecipe from './ViewRecipe/ViewRecipe.jsx';
import SearchRecipe from './SearchRecipe/SearchRecipe.jsx';
import SavedRecipe from './SavedRecipe/SavedRecipe.jsx';
import { ModalLink } from 'react-router-modal';

class RecipeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  };

  togglePopup(state) {
    this.setState({
      toggleState: state
    });
  };

  render() {
    return (
      <Router>
      <div>
        <div>
        <p>Recipe Book Page</p>
        </div>
        <ul>
          <li>
            <Link to="/recipe/create" onClick={ () => this.togglePopup(true) }>Create Recipe</Link>
          </li>
          <li>
            <Link to="/recipe/view">View Recipe</Link>
          </li>
          <li>
            <Link to="/recipe/saved">Saved Recipe</Link>
          </li>
          <li>
            <Link to="/recipe/search">Search Recipe</Link>
          </li>
        </ul>

        <hr />
        { this.state.toggleState && (
        <Route path="/recipe/create" component={
          () => <CreateRecipe closePopup={ () => this.togglePopup(false) } />
        } />
        )}
        <Route path="/recipe/view" component={ViewRecipe} />
        <Route path="/recipe/saved" component={SavedRecipe} />
        <Route path="/recipe/search" component={SearchRecipe} />

      </div>
    </Router>
    )
  }
};

export default RecipeBook;

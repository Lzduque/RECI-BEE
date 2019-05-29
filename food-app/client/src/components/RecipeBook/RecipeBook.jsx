import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateRecipe from './CreateRecipe/CreateRecipe.jsx';
import SearchRecipe from './SearchRecipe/SearchRecipe.jsx';
import SavedRecipe from './SavedRecipe/SavedRecipe.jsx';
import Checkbox from "./Checkbox";


const OPTIONS = ["Breakfast", "Meal", "Snack"];


class RecipeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: false,
      checkboxes: { Breakfast: false,
                    Meal: false,
                    Snack: false
      }
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    // this.formatQuery = this.formatQuery.bind(this);
  };


  togglePopup(state) {
    this.setState({
      toggleState: state
    });
  };

  selectAllCheckboxes = (isSelected) => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = (event) => {
    const { name } = event.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = (option) => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  // query format --> passing an array to query
  formatQuery = (queryObj) => {
    let finalQuery = [];
    for (let key in queryObj) {
      if (queryObj.key === true) {
        finalQuery.push(key);
      }
    }
    console.log(finalQuery);
    return finalQuery;
  };


  // search recipes with the product of query formatted above
  searchRecipes = () => {
    formatQuery(this.state.checkboxes);
    return fetch('/api/recipes/search', {
      method: 'GET',
      body: JSON.stringify(formatQuery),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(response => {
      return this.setState({
        // toggleState: this.state
      });
      }).catch(error => error);
  }

  // componentDidMount = () => {

  //   formatSearchRequest = () => {
  //     this.setState({
  //       checkbox: OPTIONS.reduce(
  //       (options, option) => ({
  //         ...options,
  //         [option]: false
  //       }),
  //       {}
  //       )
  //     })
  //   }

  //   formatSearchRequest();

  // }

  render() {
    return (
      <Router>
      <div>
        <div className="nav-bar">
          <ul className="nav-links-container">
            <Link className="nav-link" to="/recipe/create" onClick={ () => this.togglePopup(true) }>Create Recipe</Link>
          </ul>
        </div>

        <br/>

        <div className="create-recipe container-1">
          <div className="container-1-box page-title">
            <h1 className="page-title">Recipe Book Page</h1>
          </div>
          <br />
          <h3>Search Recipes by Category</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div className="container-1-box container-ingredients">
              {this.createCheckboxes()}
            </div>
            <div className="container-1-box">
              <div className="container-1-box container-ingredients">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button type="submit" onClick={ () => searchRecipes() } className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
            STATE
            <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
            PROPS
            <pre style={{marginTop: '1em'}}>{JSON.stringify(this.props, null, '\t')}</pre>
          </form>
        </div>

        { this.state.toggleState && (
        <Route path="/recipe/create" component={
          () => <CreateRecipe closePopup={ () => this.togglePopup(false) } />
        } />
        )}

        <SearchRecipe />
        <br/>
        <SavedRecipe />

      </div>
    </Router>
    )
  }
};

export default RecipeBook;

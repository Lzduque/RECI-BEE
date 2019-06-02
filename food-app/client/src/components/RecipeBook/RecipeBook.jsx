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
      searchShow: false,
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      searchedRecipes: [],
      searchedRecipesByID: null,
      queryArr: [],
      savedRecipes: [],
      savedRecipesByID: {}
    };
    this.togglePopup = this.togglePopup.bind(this);
    // this.searchRecipes = this.searchRecipes.bind(this);
    // this.formatQuery = this.formatQuery.bind(this);
  };


  // make popup work - crete recipe
  togglePopup(state) {
    this.setState({
      toggleState: state
    });
  };

  // handling checkbox changes!
  createCheckbox = (option) => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  selectAllCheckboxes = (isSelected) => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
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

    // query format --> passing an array to query not key pair values
    let queryArr = [];
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
        queryArr.push(checkbox);
        console.log("queryArr: ", queryArr);
        // setting the state and and sendind to the backend
        this.setState({ queryArr },
          () => {
            console.log("fetch is happening")
            // debugger

            fetch(`/api/recipes/search?queryArr=${this.state.queryArr}`, {
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
                throw new Error('Something went wrong ...');
              }
            })
            .then(recipes => {
                // console.log('recipes', recipes);
              this.setState({
                searchShow: true,
                searchedRecipes: recipes,
                searchedRecipesByID: recipes.reduce(
                  (acc, item) => Object.assign(acc, {
                    [item.id]: item
                    }), {})
              })
            })
            .catch(error => this.setState({ error }))
            .then(() => console.log('end of fetch', this.state.searchedRecipes, 'searchedID', this.state.searchedRecipesByID));
          })
      })

  };


  //put into function, needs to be passed as prop and then called after save/unsave
  //after any recipe changes (re-fetch)
  //create saves, closes and refetches
  // getting all recipes for this user
  savedRecipesForUser = () => {
    fetch('/api/books/')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        const recipes = data.map(x => x.recipe)
          // console.log('recipes', recipes);
        this.setState({
          savedRecipes: recipes,
          savedRecipesByID: recipes.reduce(
            (acc, item) => Object.assign(acc, {
              [item.id]: item
              }), {})
        })
      })
      .catch(error => this.setState({ error }))
      .then(() => console.log("savedrec", this.state.savedRecipes, "savedrecID", this.state.savedRecipesByID));
  }

  componentDidMount() {
    this.savedRecipesForUser();
  }


  render() {

    return (
      <Router>
      <div>
        <div className="container-1">
          <div className="page-title">
            <h2>Recipe Book Page</h2>
            <Link className="nav-link" id="create-recipe-button" to="/recipe/create" onClick={ () => this.togglePopup(true) }>Create Recipe</Link>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <div className="search-container">
              <h3>Search Recipes by Category</h3>
              <div className="search-container-choices">
                {this.createCheckboxes()}
              </div>
            </div>
            <div className="search-buttons-container">
              <button
                type="button"
                className="search-button"
                onClick={this.selectAll}
              >
                Select All
              </button>
              <button
                type="button"
                className="search-button"
                onClick={this.deselectAll}
              >
                Deselect All
              </button>
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
            {/* STATE
            <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
            PROPS
            <pre style={{marginTop: '1em'}}>{JSON.stringify(this.props, null, '\t')}</pre> */}
          </form>
        </div>

        { this.state.toggleState && (
        <Route path="/recipe/create" component={
          () => <CreateRecipe changeRecipeState={this.savedRecipesForUser} closePopup={ () => this.togglePopup(false) } />
        } />
        )}
        { this.state.searchShow ? <SearchRecipe changeRecipeState={this.savedRecipesForUser} searchedRecipes={this.state.searchedRecipes} /> : null }
        <SavedRecipe changeRecipeState={this.savedRecipesForUser} savedRecipes={this.state.savedRecipes} savedRecipesByID={this.state.savedRecipesByID} />
      </div>
    </Router>
    )
  }
};

export default RecipeBook;

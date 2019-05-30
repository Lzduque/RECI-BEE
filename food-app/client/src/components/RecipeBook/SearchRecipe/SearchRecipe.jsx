import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

const RecipeCard = (props) => (
  <div className="recipe-card">
    <img className="recipe-image" src={ props.image } alt={ props.alt || 'Image' }/>
    <div className="recipe-content">
      <p className="recipe-title">{ props.name }</p>
    </div>
  </div>
);

const CardContainer = (props) => {

  const onClickCard = (id) => (evt) => {
    console.log(evt.target)
    props.onCardSelected(id);
  }

  return (
    <div className="card-container">
      {
        props.searchedRecipes.map((recipe) => (
          <div className="card-button" key={ recipe.id } onClick={ onClickCard(recipe.id) }><RecipeCard
            key={ recipe.id }
            name={ recipe.name }
            image={ recipe.image }
            />
          </div>
        ))
      }
    </div>
  );
};

class SearchRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: 0,
      selectedRecipe: null
    }
  }

  getRecipeByID(id) {
    for (let recipe in this.props.recipes) {
      if (recipe.id === id) {
        return this.props.recipes.recipe;
      }
    }
    // loop through this.props.recipes
    // if recipe.id == id , then return recipe.obj else return null
  }

  render() {
    // const recipe = this.props.searchedRecipe

    return (
      <div className="search-page">
        <h1 style={{ 'textAlign': 'center' }}>
          Recipe Search
        </h1>
        <CardContainer searchedRecipes={ this.props.searchedRecipes } onCardSelected={this._recipeSelected}/>
        {
          this.state.selectedRecipe ? <ViewRecipe recipe={ this.props.selectedRecipe } closePopup={() => this.setState({ selectedRecipe: null }) } /> : null
        }
      </div>
    )
  }

  _recipeSelected = id => {
    this.setState({selectedRecipe: this.getRecipeByID(id)})
    console.log(id);
  }
};

export default SearchRecipe;



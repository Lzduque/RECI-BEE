import React, { Component } from 'react';

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
    props.onCardSelected(id);
  }

  return (
    <div className="card-container">
      {
        props.selectRecipes.map((recipe) => (
          <div className="card-button" key={recipe.id} onClick={ onClickCard(recipe.id) }><RecipeCard
            key={ recipe.id }
            name={ recipe.name }
            image={ recipe.image }
            />
          </div>
        ))
      }
    </div>
  )
}

class MealView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenRecipe: null
    }
  }

  getRecipeByID(id) {
    console.log('thispropssearch', this.props.selectRecipes);
    for (let recipe of this.props.selectRecipes) {
      console.log('recipe', recipe);
      if (recipe.id == id) {
        return recipe;
      }
    }
    return false;
    // loop through this.props.recipes
    // if recipe.id == id , then return recipe.obj else return null
  }

  render() {

    return (
        <div className='popup'>
          <div className='popup-inner'>
          <h1 style={{ 'textAlign' : 'center' }}>Add a Recipe</h1>
          <CardContainer selectRecipes={ this.props.selectRecipes } onCardSelected={this._recipeSelected}/>
          <button onClick={this.props.closePopup}>CLOSE</button>
          </div>
        </div>
    )
  }

  _recipeSelected = id => {
  let selectedRecipe = this.getRecipeByID(id);
  this.setState({selectedRecipe: selectedRecipe})
  console.log(id, 'selectedrep', 'null?', selectedRecipe);
  }
}

export default MealView;
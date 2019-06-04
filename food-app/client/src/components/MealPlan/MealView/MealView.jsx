import React, { Component } from 'react';

const ChoiceCard = (props) => (
  <div className="recipe-card">
    <img className="recipe-image" src={props.image} alt={props.alt || 'Image'}/>
    <div className="recipe-content">
      <p className="recipe-title">{props.name}</p>
      <h6 className="recipe-title">Serves: {props.servings} | Time: {props.time} min</h6>
    </div>
  </div>
);

const ChoiceContainer = (props) => {

  const onChoice = (id) => (evt) => {
    // console.log(evt.target)
    props.onChoice(id);
  }

  return (
    <div className="card-container">
      {
        props.choices.map((choice) => (
          <div className="card-button" key={choice.id} onClick={onChoice(choice.id)}><ChoiceCard
            key={choice.id}
            name={choice.name}
            image={choice.image}
            servings={choice.servings}
            time={choice.time}
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
    for (let recipe of this.props.choices) {
      console.log('recipe', recipe);
      if (recipe.id === id) {
        return recipe;
      }
    }
    return false;
  }

  choiceSelected = id => {
    let chosenRecipe = this.getRecipeByID(id);
    console.log('chosenrecipe', chosenRecipe.id);
    this.props.change(chosenRecipe)

    fetch(`/api/meal_plans?recipe_id=${chosenRecipe.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("response is happening inside save in DB")
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(recipeIsSaved => {
      console.log('recipe if saved after query DB?', recipeIsSaved);

      if (recipeIsSaved) {
        // this.setState = { saved: true };
        console.log("is being set to TRUE")
        // console.log("this.state.saved should be TRUE now: ", this.state.saved)
      } else {
        // this.setState = { saved: false };
        // this.saveRecipe();
        console.log("this.state.saved is FALSE")
        // console.log("this.state.saved should be FALSE now: ", this.state.saved)
      }
    })
    .catch(error => this.setState({ error }))
  }

  render() {

    return (
        <div className='popup'>
          <div className='popup-inner'>
            <div className="container-create-recipe">
              <div className="page-title">
                  <h2>Add a Recipe</h2>
                  <button className="close-button" onClick={this.props.closePopup}>Go Back</button>
              </div>
              <ChoiceContainer choices={ this.props.choices } onChoice={this.choiceSelected}/>
              <h3>Please select a recipe</h3>
            </div>
          </div>
        </div>
    )
  }
}

export default MealView;

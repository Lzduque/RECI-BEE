import React, { Component } from 'react';
import MealView from './MealView/MealView.jsx';
import ViewRecipe from '../RecipeBook/ViewRecipe/ViewRecipe.jsx';

class MealPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      recipes: [], // userRecipes or recipeBook
      recipesByID: null,
      chosenType: null,
      choices: {
        breakfast: null,
        meal: null,
        snack: null,
      },
    }
  };

  changeChoice = (choice) => {
    this.setState({
      choices: {
        ...this.state.choices,
        [choice.meal_type]: choice,
      },
      showPopup: false
    });
  }

  componentDidMount() {
    this.fetchRecipes();
    this.fetchSavedPlan();
  }

  filterType = (mealType) => {
    console.log('mealType: ', mealType)
    this.setState({
      chosenType: mealType,
      showPopup: true,
    })

    fetch(`/api/meal_plans/1/?recipe_id=${this.state.choices[mealType].id}`, {
      method: 'DELETE',
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
    .catch(error => this.setState({
      error
    }))
  }


  fetchSavedPlan = () => {

    fetch(`/api/meal_plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('going inside');
      data[0].meal_plan_recipes.map(i => {
        this.changeChoice(i.recipe);
      })
    })
    .catch(error => this.setState({ error }))
    .then(() => console.log("end of fetch", "show", this.state.recipes, "showID", this.state.recipesByID, this.state.showPopup));
  }

  fetchRecipes = (type) => {
    console.log("fetch begins")

    fetch(`/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const recipes = data.map( i => i.recipe)
      this.setState({
        recipes: recipes,
        recipesByID: recipes.reduce(
          (acc, item) => Object.assign(acc, {
            [item.id]: item
          }), {}),
      })
    })
    .catch(error => this.setState({ error }))
    // .then(() => console.log("end of fetch", "show", this.state.recipes, "showID", this.state.recipesByID, this.state.showPopup));
  }

  render() {
    const buttonStyles = {
      backgroundColor: 'white',
      color: 'goldenrod'
    };

    const filteredChoices = this.state.recipes.filter(recipe => this.state.chosenType === recipe.meal_type);
    console.log('chosenType: ', this.state.chosenType)
    return (

      <div id='recipe-popup'>
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

        {Object.keys(this.state.choices).map(mealType => {
          console.log("this.state.choices: ", this.state.choices)
          return (
            <div key={mealType} style={{marginBottom: '2rem'}}>
              <h2 style={{'textTransform': 'uppercase'}}>{mealType}</h2>
              {
                this.state.choices[mealType]
                ? (
                  <div>
                    <img className="chosen-image" src={this.state.choices[mealType].image} alt={this.state.choices[mealType].name || 'Image'}/>
                    <button style={buttonStyles} onClick={() => this.filterType(mealType)}>EDIT</button>
                  </div>
                )
                :
                <button style={buttonStyles} onClick={() => this.filterType(mealType)}>+</button>
              }
            </div>
          )
        })}

        {this.state.showPopup ?
          <MealView
            choices={filteredChoices}
            change={this.changeChoice}
          /> : null }
      </div>
    )
  }
};

export default MealPlan;

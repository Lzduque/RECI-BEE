import React, { Component } from 'react';
import MealView from './MealView/MealView.jsx';
import ViewRecipe from '../RecipeBook/ViewRecipe/ViewRecipe.jsx';
import Nutrition from './Nutrition/Nutrition.jsx';

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
      viewPopup: false,
      viewRecipe: null,
      viewNutrition: null,
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
    // console.log('mealType: ', mealType)
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
      // console.log("response is happening")
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
      // console.log('going inside');
      data[0].meal_plan_recipes.map(i => {
        this.changeChoice(i.recipe);
      })
    })
    .catch(error => this.setState({ error }))
    // .then(() => console.log("end of fetch", "show", this.state.recipes, "showID", this.state.recipesByID, 'hi', this.state.arrRecipe));
  }

  fetchRecipes = () => {
    // console.log("fetch begins")

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
    // .then(() => console.log("end of fetch", "show", this.state.recipes, "showID", this.state.recipesByID));
  }

  openView = (chosenType) => {
    this.setState({viewPopup : true, viewRecipe: chosenType})
  }

  togglePopup = (state) => {
    this.setState({viewPopup: state, showPopup: state, viewNutrition: state})
  }

  openNutrition = (props) => {
    // console.log('props', props)

    var nutrArr = [];

    var searchQuantity = (quantities, id) => {
      return quantities.find(element => element.recipe_id === id).quantity
    }

    props.ingredients.map((ingredient) => {
      nutrArr.push(searchQuantity(ingredient.quantities, props.id));
      nutrArr.push(ingredient.unit);
      nutrArr.push(ingredient.name);
    })

    console.log('Arr', nutrArr);
    this.setState({viewNutrition: true, viewRecipe: nutrArr})
  }

  render() {

    const buttonStyles = {
      backgroundColor: 'white',
      color: 'goldenrod'
    };

    const filteredChoices = this.state.recipes.filter(recipe => this.state.chosenType === recipe.meal_type);

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

        {this.state.viewNutrition ? <Nutrition recipe={this.state.viewRecipe}/> : null}

        {Object.keys(this.state.choices).map(mealType => {

          return (
            <div key={mealType} style={{marginBottom: '2rem'}}>
              <h2 style={{'textTransform': 'uppercase', marginBottom: '1rem'}}>{mealType}</h2>
              {
                this.state.choices[mealType]
                ? (
                  <div>
                    <h4>{this.state.choices[mealType].name}</h4>
                    <img className="chosen-image" onClick={() => this.openView(this.state.choices[mealType])} src={this.state.choices[mealType].image} alt={this.state.choices[mealType].name || 'Image'}/>
                    <button style={buttonStyles} onClick={() => this.filterType(mealType)}>EDIT</button>
                    <button style={{float: 'right'}} onDoubleClick={() => this.togglePopup(false)} onClick={() => this.openNutrition(this.state.choices[mealType])}>Nutrition</button>
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
            closePopup={() => this.togglePopup(false)}
          /> : null }

        {this.state.viewPopup ?
          <ViewRecipe
            recipe={this.state.viewRecipe}
            closePopup={() => this.togglePopup(false)}
          />  : null}

      </div>
    )
  }
};

export default MealPlan;

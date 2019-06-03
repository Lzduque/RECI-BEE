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
      servings: null,
      showNutrition: null,
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
    this.setState({viewPopup: state, showPopup: state})
  }

  displayNutrition = (props) => {
    let result = this.makeRequest(this.transform(this.openNutrition(props)));
    console.log('result', result);
    this.setState({
      showNutrition: result
    })
  }

  openNutrition = (props) => {
    // console.log('props on open nutrition', props)
    var nutrArr = [];

    var searchQuantity = (quantities, id) => {
      // console.log("inside search Quantity");
      return quantities.find(element => element.recipe_id === id).quantity
    }

    props.ingredients.map((ingredient) => {
      // console.log("inside map ingredient for", ingredient);
      nutrArr.push(searchQuantity(ingredient.quantities, props.id));
      nutrArr.push(ingredient.unit);
      nutrArr.push(ingredient.name);
    })
    this.setState({servings: props.servings});
    // console.log('serv', props.servings, 'nutrArr', nutrArr);
    return nutrArr;
  }

  transform = (props) => {
    let string = [];
    // console.log('props on transform', props);
    while (props.length > 0) {
      let chunk = " " + (props.splice(0, 3).join(" "));
      string.push(chunk);
    }
    var q = string.toString().substring(1);
    // console.log("finish transform")
    return q;
  }

  makeRequest = (param) => {
    var request = require("request");
    // console.log("inside make request!")
    var options = {
      method: 'POST',
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: {
        'postman-token': 'e84dd3d8-9bab-43cc-fbfe-79124b07c6;a3',
        'cache-control': 'no-cache',
        accept: 'application/json',
        'content-type': 'application/json',
        'x-remote-user-id': '0',
        'x-app-key': 'aaf88207f36c8f1a7baf0e5f3da7bde7',
        'x-app-id': 'de975639'
      },
      body: {
        query: param,
      },
      json: true
    };

    request(options, function (error, body) {
      if (error) throw new Error(error);
      // console.log('body inside request', body)
      return body
    })
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

        { this.state.showNutrition ?
          <Nutrition servings={this.state.servings} nutrition={this.state.showNutrition}/>
        : null }

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
                    <button style={{float: 'right'}} onClick={() => this.displayNutrition(this.state.choices[mealType])}>Nutrition</button>
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

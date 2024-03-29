import React, { Component } from 'react';
import MealView from './MealView/MealView.jsx';
import ViewRecipe from '../RecipeBook/ViewRecipe/ViewRecipe.jsx';
import Nutrition from './Nutrition/Nutrition.jsx';
import request from 'request'


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
      servings: null,
    }
  };

  changeChoice = (choice) => {
    console.log('choice', choice)
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
      console.log('data being fetch: ', data);
      // console.log('today meal plan id: ', data[0].id);
      // this.setState({ meal_plan_id: data[0].id })
      data[0].meal_plan_recipes.map(i => {
        this.changeChoice(i.recipe);
      })
    })
    .catch(error => this.setState({ error }))
    // .then(() => console.log("end of fetch", "show", this.state.recipes, "showID", this.state.recipesByID, 'hi', this.state.arrRecipe));
  }

  // fetch all recipes saved in user book
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
    this.setState({
      viewPopup : true,
      viewRecipe: chosenType
    })
  }

  togglePopup = (state) => {
    this.setState({viewPopup: state, showPopup: state, viewNutrition: state})
  }

  openNutrition = (mealType) => {
    console.log('mealType on open nutrition', mealType)

    var nutrArr = [];

    var searchQuantity = (quantities, id) => {
      console.log("inside search Quantity");
      return quantities.find(element => element.recipe_id === id).quantity
    }

    mealType.ingredients.map((ingredient) => {
      console.log("inside map ingredient for", ingredient);
      nutrArr.push(searchQuantity(ingredient.quantities, mealType.id));
      nutrArr.push(ingredient.unit);
      nutrArr.push(ingredient.name);
    })
    this.setState({ servings: mealType.servings });
    console.log('serv', mealType.servings, 'nutrArr', nutrArr);
//COME BACK TO THIS MAY NEED TO SET STATE viewNutrition: true, viewRecipe: nutrArr
    return nutrArr;
  }

  transform(props) {
    let string = [];
    console.log('props on transform', props);
    while (props.length > 0) {
      let chunk = " " + (props.splice(0, 3).join(" "));
      string.push(chunk);
    }
    var q = string.toString().substring(1);
    console.log("finish transform")
    return q;
  }

  buildRequest = (param) => {
    console.log("inside make request!")
    var options = {
      method: 'POST',
      headers: {
        'postman-token': 'e84dd3d8-9bab-43cc-fbfe-79124b07c6;a3',
        'cache-control': 'no-cache',
        accept: 'application/json',
        'content-type': 'application/json',
        'x-remote-user-id': '0',
        'x-app-key': 'aaf88207f36c8f1a7baf0e5f3da7bde7',
        'x-app-id': 'de975639'
      },
      body: JSON.stringify({
        query: param,
      }),
      json: true
    }
    return options
  }

  updateNutrition(nutrition) {
    this.setState({
      viewNutrition: nutrition
    })
    console.log('nutr', nutrition);
  }

  displayNutrition(mealType) {
    const openNutrition = this.transform(this.openNutrition(mealType))

    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", this.buildRequest(openNutrition)).then((res) => {
      return res.json();
    }).then((body) => {
      this.updateNutrition(body.foods);
    }).catch((err) => { console.error(err) })
  }

  renderHeader() {
    return (
      <div className="container-1">
        <div className="page-title">
          <h2 className="page-title">Meal Plan</h2>
        </div>
      </div>
    );
  }

  renderNutrition(mealType) {
    if (this.state.viewNutrition && this.state.viewNutrition.length == this.state.choices[mealType].ingredients.length) {
      return (
        <Nutrition
          servings={this.state.servings}
          nutrition={this.state.viewNutrition}
          closePopup={()=> this.togglePopup(false)}/>
      )
    }
  }

  renderMeals() {

    return Object.keys(this.state.choices).map(mealType => {
      return (
        <div key={mealType} className="chosen-recipe-container" >
          <h4>{mealType}</h4>
        {
          this.state.choices[mealType]
          ? (
            <div>
              <button className="nutrition-button"
                // onDoubleClick={() => this.togglePopup(false)}
                onClick={() => this.displayNutrition(this.state.choices[mealType])}
                >Nutrition</button>

              {this.renderNutrition(mealType)}

              <div className="recipe-card">
                <div className="recipe-content">
                  <h6 className="recipe-title">{this.state.choices[mealType].name}</h6>
                </div>
                <img
                  className="recipe-image"
                  onClick={() => this.filterType(mealType)}
                  src={this.state.choices[mealType].image}
                  alt={this.state.choices[mealType].name || 'Image'} />
                <button
                  className="button-edit"
                  onClick={() => this.openView(this.state.choices[mealType])}
                  >VIEW RECIPE</button>
              </div>
            </div>
            ) : <button className="button-meal" onClick={() => this.filterType(mealType)}>+</button>
          }
          </div>
        )
    })
  }

  render() {

    const filteredChoices = this.state.recipes.filter(recipe => this.state.chosenType === recipe.meal_type);

    return (
      <div id='recipe-popup'>

      {this.renderHeader()}
      <div className="container-1" >
        <h3>Select Meals for the Day</h3>

        {this.renderMeals()}

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

              {/* STATE
              <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
              PROPS
              <pre style={{marginTop: '1em'}}>{JSON.stringify(this.props, null, '\t')}</pre> */}
        </div>
      </div>
    )
  }
};

export default MealPlan;

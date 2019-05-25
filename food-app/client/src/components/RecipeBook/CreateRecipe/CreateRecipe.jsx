import React, { Component } from 'react';
import Ingredients from './Ingredients.jsx';
// import Autosuggest from 'react-autosuggest';
// https://github.com/moroshko/react-autosuggest

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { newRecipe: { recipeTitle: "",
                                mealType: "meal",
                                preparation: "",
                                recipeImg: "",
                                servings: 0,
                                cookingTime: 0,
                                ingredients: []
                              },
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (propertyName) => (event) => {
    console.log('Handling change!');
    console.log('this.state.newRecipe: ', this.state.newRecipe);

    const { newRecipe } = this.state;
    const recipe = {
      ...newRecipe,
      [propertyName]: event.target.value
    };
    this.setState({ newRecipe: recipe });
    console.log('this.state.newRecipe.recipeTitle: ', this.state.newRecipe.recipeTitle);
    console.log('this.state.newRecipe.mealType: ', this.state.newRecipe.mealType);
    console.log('this.state.newRecipe.preparation: ', this.state.newRecipe.preparation);
    console.log('this.state.newRecipe.recipeImg: ', this.state.newRecipe.recipeImg);
    console.log('this.state.newRecipe.servings: ', this.state.newRecipe.servings);
    console.log('this.state.newRecipe.cookingTime: ', this.state.newRecipe.cookingTime);
    console.log('this.state.newRecipe.ingredients: ', this.state.newRecipe.ingredients);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newRecipe = {
      recipeTitle: this.state.newRecipe.recipeTitle,
      mealType: this.state.newRecipe.mealType,
      preparation: this.state.newRecipe.preparation,
      recipeImg: this.state.newRecipe.recipeImg,
      servings: this.state.newRecipe.servings,
      cookingTime: this.state.newRecipe.cookingTime,
      ingredients: this.state.newRecipe.ingredients
    }

    fetch(`/api/recipe/create?newRecipe=${newRecipe}`, {
        accept: 'application/json',
      }).then(checkStatus)
      .then( (response) => {
        return response.json();
      })

    alert('A recipe was created: ' + this.state.newRecipe.recipeTitle);

  }

  render() {
    return (
      <div className="create-recipe container-1">
        <div className="container-1-box">
          <h1>Create Recipe Page</h1>
        </div>
        <hr />
        <form>
          <label>
            <div className="container-1-box">
              <input name="recipeTitle"
                      type="text"
                      value={this.state.newRecipe.recipeTitle}
                      onChange={this.handleChange('recipeTitle')} />
            </div>
          </label>
          <label>
            <Ingredients />
          </label>
          <label>
            <div className="container-1-box">
              <h3>Recipe Image</h3>
              <input name="recipeImg" value={this.state.newRecipe.recipeImg} type="file" onChange={this.handleChange('recipeImg')} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Servings per Recipe</h3>
              <p>qt.(input field that acepts only integers)</p>
              <input name="servings"
                      type="number"
                      value={this.state.newRecipe.servings}
                      onChange={this.handleChange('servings')} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Cooking Time</h3>
              <p>qt.(input field that acepts only integers) minutes (hardcoded string)</p>
              <input name="cookingTime"
                      type="number"
                      value={this.state.newRecipe.cookingTime}
                      onChange={this.handleChange('cookingTime')} /> minutes
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Meal Type (one choice only)</h3>
              <select name="mealType" value={this.state.newRecipe.mealType} onChange={this.handleChange('mealType')}>
                <option value="breakfast">Breakfast</option>
                <option value="meal">Meal</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Preparation</h3>
              <textarea name="preparation" value={this.state.newRecipe.preparation} onChange={this.handleChange('preparation')} />
            </div>
          </label>
          <div className="container-1-box">
            <input type="submit" value="Create Recipe" />
          </div>
        </form>
      </div>
    )
  }
};

export default CreateRecipe;

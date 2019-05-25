import React, { Component } from 'react';
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
    this.state = { recipeTitle: "",
                    mealType: "meal",
                    preparation: "",
                    recipeImg: "",
                    servings: 0,
                    cookingTime: 0,
                    ingredients: []
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateIngredient = (id, collectionName, event) => {
    event.persist();
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].map(item => {
        return item.id !== id ? item : Object.assign({}, item, {
          [event.target.name]: event.target.value
        });
      })
    }));
  };

  addIngredient = (collectionName) => {
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].concat([{
        id: `${collectionName}-${this.state.ingredients.length}`,
        ingridentName: '',
        ingredientQt: 0
      }])
    }));
  };

  removeIngredient = (id, collectionName, event) => {
    this.setState((prevState) => {
      let indexToRemove = prevState[collectionName].findIndex(x => x.id === id);
      return {
        [collectionName]: [...prevState[collectionName].slice(0, indexToRemove), ...prevState[collectionName].slice(indexToRemove + 1)]
      }
    });
  };


  handleChange = (propertyName) => (event) => {
    console.log('Handling change!');
    console.log('this.state: ', this.state);

    const { recipe } = this.state;
    const newRecipe = {
      ...recipe,
      [propertyName]: event.target.value
    };
    this.setState({ recipe: newRecipe });
    console.log('this.state.recipeTitle: ', this.state.recipeTitle);
    console.log('this.state.mealType: ', this.state.mealType);
    console.log('this.state.preparation: ', this.state.preparation);
    console.log('this.state.recipeImg: ', this.state.recipeImg);
    console.log('this.state.servings: ', this.state.servings);
    console.log('this.state.cookingTime: ', this.state.cookingTime);
    console.log('this.state.ingredients: ', this.state.ingredients);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newRecipe = {
      recipeTitle: this.state.recipeTitle,
      mealType: this.state.mealType,
      preparation: this.state.preparation,
      recipeImg: this.state.recipeImg,
      servings: this.state.servings,
      cookingTime: this.state.cookingTime,
      ingredients: this.state.ingredients
    }

    fetch(`/api/recipe/create?newRecipe=${newRecipe}`, {
        accept: 'application/json',
      }).then(checkStatus)
      .then( (response) => {
        return response.json();
      })

    alert('A recipe was created: ' + this.state.recipeTitle);

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
                      value={this.state.recipeTitle}
                      onChange={this.handleChange('recipeTitle')} />
            </div>
          </label>
          <label>
            <div className="container-ingredients">
              {
                this.state.ingredients.map((item, i) => (
                  <div className="ingredients-box" key={item.id} >
                    <input className="form-control" name="ingridentName" value={item.ingridentName} onChange={this.updateIngredient.bind(this, item.id, 'ingredients')}/>
                    <input className="form-control" name="ingredientQt" value={item.ingredientQt} onChange={this.updateIngredient.bind(this, item.id, 'ingredients')}/>
                    <span>
                      <button className="btn btn-danger" onClick={this.removeIngredient.bind(this, item.id, 'ingredients')}>Remove</button>
                    </span>
                  </div>
                ))
              }
              <div className="ingredients-box">
                <button type="button" className="btn btn-primary" onClick={this.addIngredient.bind(this, 'ingredients')}>Add Ingredient</button>
              </div>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Recipe Image</h3>
              <input name="recipeImg" value={this.state.recipeImg} type="file" onChange={this.handleChange('recipeImg')} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Servings per Recipe</h3>
              <p>qt.(input field that acepts only integers)</p>
              <input name="servings"
                      type="number"
                      value={this.state.servings}
                      onChange={this.handleChange('servings')} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Cooking Time</h3>
              <p>qt.(input field that acepts only integers) minutes (hardcoded string)</p>
              <input name="cookingTime"
                      type="number"
                      value={this.state.cookingTime}
                      onChange={this.handleChange('cookingTime')} /> minutes
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Meal Type (one choice only)</h3>
              <select name="mealType" value={this.state.mealType} onChange={this.handleChange('mealType')}>
                <option value="breakfast">Breakfast</option>
                <option value="meal">Meal</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Preparation</h3>
              <textarea name="preparation" value={this.state.preparation} onChange={this.handleChange('preparation')} />
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

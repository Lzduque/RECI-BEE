import React, { Component } from 'react';
// import Autosuggest from 'react-autosuggest';
// https://github.com/moroshko/react-autosuggest

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const error = new Error(`HTTP Error ${response.statusText}`);
//   error.status = response.statusText;
//   error.response = response;
//   console.log(error); // eslint-disable-line no-console
//   throw error;
// }

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipeTitle: "",
                    mealType: "meal",
                    preparation: "",
                    recipeImg: "",
                    servings: 0,
                    cookingTime: 0,
                    ingredients: [],
                    options: ""
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.ingredientsOp = this.ingredientsOp.bind(this);
  }

  componentDidMount() {

    fetch('/api/ingredients')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(options => this.setState({ options }))
      .catch(error => this.setState({ error }))

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
        ingredientName: '',
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

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log('Handling change!');
    console.log('this.state: ', this.state);
    console.log('event.target.value: ',event.target.value);
    console.log('event.target.name', event.target.name);

    this.setState({
      [name]: value
    });
    console.log('new this.state: ', this.state);
  }

  handleSubmit = (event) => {
    alert('Submitted 1: ' + this.state.recipeTitle);
    debugger
    event.preventDefault();
    let newRecipe = {
      name: this.state.recipeTitle,
      meal_type: this.state.mealType,
      preparation: this.state.preparation,
      image: this.state.recipeImg,
      servings: this.state.servings,
      time: this.state.cookingTime,
      ingredients: this.state.ingredients
    }
    console.log('newRecipe: ',newRecipe);

    const createRecipe = (data) => {
      return fetch('/api/recipes', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          return response;
      }).catch(error => error);
    };

    createRecipe(newRecipe)
  }

  render() {
    return (
      <div className="create-recipe container-1">
        <div className="container-1-box page-title">
          <h1>Create Recipe Page</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="container-1-box">
            <h3>Recipe Title</h3>
              <input name="recipeTitle"
                      value={this.state.recipeTitle}
                      type="text"
                      onChange={this.handleChange} />
            </div>
          </label>
          <label>
            <div className="container-ingredients">
              <h3>Ingredients</h3>
              <div className="container-ingredients">
              {
                this.state.ingredients.map((item, i) => (
                  <div className="ingredients-box" key={item.id} >
                    <select name="ingredientName"
                            value={item.ingredientName}
                            onChange={this.updateIngredient.bind(this, item.id, 'ingredients')}>
                      { this.state.options.map((data) => <option key={data.id} value={data.name}>{data.name}</option>)
                      }

                    </select>
                    <input className="form-control"
                            name="ingredientQt"
                            value={item.ingredientQt}
                            type="number"
                            onChange={this.updateIngredient.bind(this, item.id, 'ingredients')}/>
                    type of unit - search for ingredient in options with the same id and return data.unit
                    <span>
                      <button className="btn btn-danger" onClick={this.removeIngredient.bind(this, item.id, 'ingredients')}>Remove</button>
                    </span>
                  </div>
                ))
              }
              </div>
              <div className="ingredients-box">
                <button type="button" className="btn btn-primary" onClick={this.addIngredient.bind(this, 'ingredients')}>Add Ingredient</button>
              </div>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Recipe Image</h3>
              <input name="recipeImg"
                      value={this.state.recipeImg}
                      type="file"
                      onChange={this.handleChange} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Servings per Recipe</h3>
              <input name="servings"
                      value={this.state.servings}
                      type="number"
                      onChange={this.handleChange} /> servings
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Cooking Time</h3>
              <input name="cookingTime"
                      value={this.state.cookingTime}
                      type="number"
                      onChange={this.handleChange} /> minutes
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Meal Type</h3>
              <select name="mealType"
                      value={this.state.mealType}
                      onChange={this.handleChange}>
                <option value="breakfast">Breakfast</option>
                <option value="meal">Meal</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Preparation</h3>
              <textarea className="preparation-box"
                        name="preparation"
                        type="text"
                        placeholder="1. First ...."
                        value={this.state.preparation}
                        onChange={this.handleChange} />
            </div>
          </label>
          <div className="container-1-box">
            <input type="submit" value="Create Recipe" />
          </div>
        </form>
        <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
      </div>
    )
  }
};

export default CreateRecipe;

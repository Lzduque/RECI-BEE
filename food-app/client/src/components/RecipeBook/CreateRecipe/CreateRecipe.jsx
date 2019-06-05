import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

// import Autosuggest from 'react-autosuggest';
// https://github.com/moroshko/react-autosuggest

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipeTitle: "",
                    mealType: "meal",
                    preparation: "",
                    recipeImg: "https://image.flaticon.com/icons/svg/1813/1813029.svg",
                    servings: 0,
                    cookingTime: 0,
                    ingredients: [],
                    options: "",
                    redirect: false
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.ingredientsOp = this.ingredientsOp.bind(this);
  }

   componentDidMount() {

     // render all ingredients that exist
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

   getIngredientId = (event) => {
    let id;
    this.state.options.forEach((option) => {
      if (option.name === event.target.value) {
        return id = option.id;
      }
    })
    return id;
  }

   updateIngredient = (id, collectionName, event) => {
    // console.log('item', id);
    // console.log('collectionName', collectionName);
    // debugger
    event.persist();
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].map(item => {
        // console.log('event.target', event.target)
        return item.id !== id ? item : Object.assign({}, item, {
          [event.target.name]: event.target.value,
          ingredientId: this.getIngredientId(event),
        });
      })
    }));
  };

   updateQuantity = (id, collectionName, event) => {
    // console.log('item', id);
    // console.log('collectionName', collectionName);
    // debugger
    event.persist();
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].map(item => {
        // console.log('event.target', event.target)
        return item.id !== id ? item : Object.assign({}, item, {
          [event.target.name]: event.target.value
        });
      })
    }));
  };

   addIngredient = (collectionName) => {
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].concat([{
        id: Math.floor(Math.random() * 100),
        ingredientId: this.state.options[0].id,
        ingredientName: this.state.options[0].name,
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
    console.log('event.target.value: ', event.target.value);
    console.log('event.target.name', event.target.name);

     this.setState({
      [name]: value
    });
    console.log('new this.state: ', this.state);
  }

   // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     console.log("Is trying to redirect!")
  //     return <Redirect to='/recipebook' />
  //   }
  // }

   handleSubmit = (event) => {
    // alert('Submitted 1: ' + this.state.recipeTitle);
    // debugger
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

     // to create a new recipe in DB, connect it to ingredients and to the user
    const createRecipe = (data) => {
      return fetch('/api/recipes', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(options => this.setState({ redirect: true }, () => {
        console.log('change recipe state');
        this.props.changeRecipeState();
      })
      ).catch(error => error);
    };

     createRecipe(newRecipe)
  }

   render() {
    if (this.state.redirect) {
      return <Redirect to='/recipebook' />
    }

     return (
      <div className='popup' >
        <div className='popup-inner' >
          <div className="container-create-recipe">
            <div className="page-title">
              <h2>Create Recipe Page</h2>
              <button className="close-button"  onClick={ () => this.props.closePopup() }>&#160;X&#160;</button>
            </div>
            <form onSubmit={ this.handleSubmit } >
              <label>
                <div className="create-recipe-field">
                <h5>Recipe Title</h5>
                  <input name="recipeTitle"
                          value={this.state.recipeTitle}
                          type="text"
                          placeholder="Recipe Title"
                          onChange={this.handleChange} />
                </div>
              </label>
              <label>
                <div className="create-recipe-field">
                  <h5>Ingredients</h5>
                  <div>
                    <button type="button" onClick={this.addIngredient.bind(this, 'ingredients')}>Add Ingredient</button>
                  </div>
                  <div className="create-recipe-field container-ingredients">
                  {
                    this.state.ingredients.map((item, i) => (
                      <div key={item.id} >
                        <select name="ingredientName"
                                value={item.ingredientName}
                                ingredientid={item.ingredientid}
                                onChange={this.updateIngredient.bind(this, item.id, 'ingredients')}>
                                {console.log('item', item)}
                          { this.state.options.map((data) => <option key={data.id} id={data.id} ingredientid={data.id} unit={data.unit} value={data.name}>{data.name} ({data.unit})</option>)
                          }
                        </select>
                        qt.:<input className="form-control"
                                    name="ingredientQt"
                                    value={item.ingredientQt}
                                    type="number"
                                    min="0"
                                    onChange={this.updateQuantity.bind(this, item.id, 'ingredients')}/>
                        <span>
                          <button type="button" onClick={this.removeIngredient.bind(this, item.id, 'ingredients')}>Remove</button>
                        </span>
                      </div>
                    ))
                  }
                  </div>
                </div>
              </label>
              <label>
                <div className="create-recipe-field">
                  <h5>Recipe Image Url</h5>
                  <input name="recipeImg"
                          value={this.state.recipeImg}
                          onChange={this.handleChange}
                          type="url"
                          pattern="https://.*" size="30" />
                </div>
              </label>
              <label>
                <div className="create-recipe-field">
                  <h5>Servings per Recipe</h5>
                  <input name="servings"
                          value={this.state.servings}
                          type="number"
                          min="0"
                          onChange={this.handleChange} /> servings
                </div>
              </label>
              <label>
                <div className="create-recipe-field">
                  <h5>Total Time</h5>
                  <input name="cookingTime"
                          value={this.state.cookingTime}
                          type="number"
                          min="0"
                          onChange={this.handleChange} /> minutes
                </div>
              </label>
              <label>
                <div className="create-recipe-field">
                  <h5>Meal Type</h5>
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
                <div className="create-recipe-field">
                  <h5>Preparation</h5>
                  <textarea className="preparation-box"
                            name="preparation"
                            type="text"
                            placeholder="1. First ...."
                            value={this.state.preparation}
                            onChange={this.handleChange} />
                </div>
              </label>
              <div className="container-1-box container-ingredients">
                <button type="submit">Create Recipe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
};


 export default CreateRecipe;
import React, { Component } from 'react';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipeTitle: "",
                    mealType: "meal",
                    preparation: "",
                    recipeImg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [event.target.name]: event.target.value });
    console.log('this.state.recipeTitle: ', this.state.recipeTitle)
    console.log('this.state.mealType: ', this.state.mealType)
    console.log('this.state.preparation: ', this.state.preparation)
    console.log('this.state.recipeImg: ', this.state.recipeImg)
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   alert('A recipe was created: ' + this.state.recipeTitle);

  //   const search = ([recipeTitle, mealType], callback) => {
  //     return fetch(`/api/recipe/create?recipeTitle=${recipeTitle}?mealType=${mealType}`, {
  //         accept: 'application/json',
  //       }).then(checkStatus)
  //       .then( (response) => {
  //         return response.json();
  //       })
  //       .then(callback)

  //     search(this.state.name, (user) => {
  //       console.log(user);
  //       this.setState({
  //         user
  //       });
  //     });

  //   };
  // }


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
                      value= {this.state.recipeTitle}
                      onChange={this.handleChange} />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Ingridients</h3>
              <p>autosuggest ingridients here!</p>
              <p>Ingridient name(autossugest - only ingridients that we have - error message) - qt.(input field that acepts only integers) - unit(hardcoded, will appear when the ingridient is choosen)</p>
              <p>automatically another line like this appears to add another ingridient</p>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Recipe Image</h3>
              <input name="recipeImg" type="file" />
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Servings per Recipe</h3>
              <p>qt.(input field that acepts only integers)</p>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Coocking Time</h3>
              <p>qt.(input field that acepts only integers) minutes (hardcoded string)</p>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Meal Type (one choice only)</h3>
              <select name="mealType" value={this.state.mealType} onChange={this.handleChange}>
                <option value="breakfast">Breakfast</option>
                <option value="meal">Meal</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Preparation</h3>
              <textarea name="preparation" value={this.state.preparation} onChange={this.handleChange} />
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

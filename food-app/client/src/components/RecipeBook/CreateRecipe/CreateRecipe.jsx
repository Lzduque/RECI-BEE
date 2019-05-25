import React, { Component } from 'react';

class CreateRecipe extends Component {
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
              <h2>Recipe Title - input with placeholder</h2>
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
              <p>upload image from computer</p>
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
              <p>checklist Breakfast</p>
              <p>checklist Meal</p>
              <p>checklist Snack</p>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <h3>Preparation</h3>
              <p>free textarea that will take XX max of characters</p>
            </div>
          </label>
          <label>
            <div className="container-1-box">
              <p>Create Recipe Button</p>
            </div>
          </label>
        </form>
      </div>
    )
  }
};

export default CreateRecipe;

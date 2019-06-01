import React, { Component } from 'react';
import MealView from './MealView/MealView.jsx';

class MealPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showRecipes: [],
      showRecipesByID: null,
      recipeType: "",
      chosenBreakfast: null,
      chosenMeal: null,
      chosenSnack: null
    }
  };

  changeChoice = (props) => {
    if (props.meal_type === 'breakfast') {
      this.setState({
        chosenBreakfast: props,
        showPopup: null
      })
    }
    if (props.meal_type === 'meal') {
      this.setState({
        chosenMeal: props,
        showPopup: null
      })
    }
    if (props.meal_type === 'snack') {
      this.setState({
        chosenSnack: props,
        showPopup: null
      })
    }
  }

  typeToggle = (type) => {
    this.setState({ recipeType: type }, () => {
      console.log("fetch begins")

      fetch(`/api/books/search?type=${this.state.recipeType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response is happening")
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something bad');
        }
      })
      .then(data => {
        const recipes = data.map( i => i.recipe)
        this.setState({
          showPopup: true,
          showRecipes: recipes,
          showRecipesByID: recipes.reduce(
            (acc, item) => Object.assign(acc, {
              [item.id]: item
            }), {}),
        })
      })
      .catch(error => this.setState({ error }))
      .then(() => console.log("end of fetch", "show", this.state.showRecipes, "showID", this.state.showRecipesByID, this.state.showPopup));
    })
  }

  render() {

    print = () => {
      console.log('printing')
      const printWindow = window.open('', '', 'height=800, width=800');
      printWindow.document.write('<html><head><title>Recipe</title></head>');
      printWindow.document.write('<body>');
      printWindow.document.write(document.getElementById('recipe-popup').innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.print();
      printWindow.close();
    }

    return (

      <div>
        <div className="nav-bar">
        </div>
        <br/>
        <div className="create-recipe container-1">
          <div className="container-1-box page-title">
            <h1 className="page-title">Meal Plan Page</h1>
          </div>
        </div>
        <hr />
        <br/>
        <h3>Select Meals for the Day</h3>
        <button onClick={print}>PRINT</button>
        <br/>
        <br/>
        <h2>BREAKFAST</h2>
        <br/>
        { this.state.chosenBreakfast ? <img className="recipe-image" src={this.state.chosenBreakfast.image} alt={this.state.chosenBreakfast.name || 'Image'}/> :
          <button style={{
            backgroundColor: 'white',
            color: 'goldenrod'}} onClick={() => this.typeToggle('breakfast')}>+</button>
        }
        <br/>
        <br/>
        <h2>MEALS</h2>
        <br/>
        { this.state.chosenMeal ? <img className="recipe-image" src={this.state.chosenMeal.image} alt={this.state.chosenMeal.name || 'Image'}/> :
          <button style={{
            backgroundColor: 'white',
            color: 'goldenrod'}} onClick={() => this.typeToggle('meal')}>+</button>
        }
        <br/>
        <br/>
        <h2>SNACK</h2>
        <br/>
        { this.state.chosenSnack ? <img className="recipe-image" src={this.state.chosenSnack.image} alt={this.state.chosenSnack.name || 'Image'}/> :
          <button style={{
            backgroundColor: 'white',
            color: 'goldenrod'}} onClick={() => this.typeToggle('snack')}>+</button>
        }
        {this.state.showPopup ?
          <MealView
            choices={this.state.showRecipes}
            change={this.changeChoice}
          /> : null }
      </div>
    )
  }
};

export default MealPlan;


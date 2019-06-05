import React, { Component } from 'react';


class Nutrition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calories: 0,
      protein: 0,
      fat: 0,
      sugars: 0,
      carbs: 0,
    }
  }

  render() {

    this.props.nutrition.map((ing) => {
      this.state.calories += ing.nf_calories;
      this.state.protein += ing.nf_protein;
      this.state.fat += ing.nf_total_fat;
      this.state.sugars += ing.nf_sugars;
      this.state.carbs += ing.nf_total_carbohydrate;
    })

    return (
      <div style={{float: 'right'}}>
      <br/>
        <h3>Nutrition</h3>
          <h6>Servings: {this.props.servings}</h6>
          <h6>Calories: {Math.round(this.state.calories)}</h6>
          <h6>Protein: {Math.round(this.state.protein)}g</h6>
          <h6>Fat: {Math.round(this.state.fat)}g</h6>
          <h6>Sugar: {Math.round(this.state.sugars)}g</h6>
          <h6>Carbs: {Math.round(this.state.carbs)}g</h6>
          <button onClick={this.props.closePopup}>Hide</button>
      </div>
    )
  }
}

export default Nutrition;



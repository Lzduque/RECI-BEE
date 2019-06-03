import React, { Component } from 'react';

class Nutrition extends Component {

  render() {

    return (
      <div style={{float: 'right'}}>
        <h3>Nutrition</h3>
        <h6>Servings: {this.props.calories}</h6>
        {/* <h6>Calories: {this.props.nutrition[0]}</h6>
        <h6>Protein: {this.props.nutrition[1]}</h6>
        <h6>Fat: {this.props.nutrition[2]}</h6>
        <h6>Sugar: {this.props.nutrition[3]}</h6>
        <h6>Carbs: {this.props.nutrition[4]}</h6> */}
      </div>
    )
  }
};

export default Nutrition;
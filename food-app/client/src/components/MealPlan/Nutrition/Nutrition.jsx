import React, { Component } from 'react';


class Nutrition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calories: 0,
      fat: 0,
      satFat: 0,
      cholesterol: 0,
      sodium: 0,
      carbs: 0,
      fiber: 0,
      sugars: 0,
      protein: 0,
    }
  }

  render() {

    this.props.nutrition.map((ing) => {
      this.state.calories += ing.nf_calories;
      this.state.fat += ing.nf_total_fat;
      this.state.satFat += ing.nf_saturated_fat;
      this.state.cholesterol += ing.nf_cholesterol;
      this.state.sodium += ing.nf_sodium;
      this.state.carbs += ing.nf_total_carbohydrate;
      this.state.fiber += ing.nf_dietary_fiber;
      this.state.sugars += ing.nf_sugars;
      this.state.protein += ing.nf_protein;

    })

    return (
      <div id="nutritionfacts">
        <table style={{width:"242", cellSpacing:"0", cellPadding:"0"}}>
            <tbody><tr>
                <td style={{align:"center"}} className="header">Nutrition Facts</td>
            </tr>
            <tr>
                <td><div className="serving">Total Servings: {this.props.servings}</div></td>
            </tr>
            <tr style={{height: "7px"}}>
                <td style={{backgroundColor:"#000000"}}></td>
            </tr>
            <tr>
                <td style={{fontSize: "7pt"}}><div className="line">Amount Per Serving</div></td>
            </tr>
            <tr>
                <td>
                    <div className="line">
                    <div className="label">Calories <div className="weight">{Math.round(this.state.calories / this.props.servings)}</div></div><div style={{paddingTop: "1px", float: "right"}} className="dvlabel">% Daily Value<sup>*</sup></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="line">
                    <div className="label">Total Fat <div className="weight">{Math.round(this.state.fat / this.props.servings)}g</div></div>
                    <div className="dv">{Math.round(((this.state.fat / this.props.servings) / 65) * 100)}%</div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td className="indent">
                    <div className="line">
                    <div className="labellight">Saturated Fat <div className="weight">{Math.round(this.state.satFat / this.props.servings)}g</div></div>
                    <div className="dv">{Math.round(((this.state.satFat / this.props.servings) / 20) * 100)}%</div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td>
                    <div className="line">
                    <div className="label">Cholesterol <div className="weight">{Math.round(this.state.cholesterol / this.props.servings)}mg</div></div>
                    <div className="dv">{Math.round(((this.state.cholesterol / this.props.servings) / 300) * 100)}%</div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td>
                    <div className="line">
                    <div className="label">Sodium <div className="weight">{Math.round(this.state.sodium / this.props.servings)}mg</div></div>
                    <div className="dv">{Math.round(((this.state.sodium / this.props.servings) / 2400) * 100)}%</div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td>
                    <div className="line">
                    <div className="label">Total Carbohydrates <div className="weight">{Math.round(this.state.carbs / this.props.servings)}g</div></div>
                    <div className="dv"></div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td className="indent">
                    <div className="line">
                    <div className="labellight">Dietary Fiber <div className="weight">{Math.round(this.state.fiber / this.props.servings)}g</div></div>
                    <div className="dv">{Math.round(((this.state.fiber / this.props.servings) / 25) * 100)}%</div>
                </div></td>
            </tr>
                        <tr>
                <td className="indent">
                    <div className="line">
                    <div className="labellight">Sugars <div className="weight">{Math.round(this.state.sugars / this.props.servings)}g</div></div>
                    </div>
                </td>
            </tr>
                        <tr>
                <td>
                    <div className="line">
                    <div className="label">Protein <div className="weight">{Math.round(this.state.protein / this.props.servings)}g</div>
                    </div>
                </div></td>
            </tr>
            <tr style={{height: "7px"}}>
                <td style={{backgroundColor: "#000000"}}></td>
            </tr>
                        <tr>
                <td>
                </td>
            </tr>
                        <tr>
                <td><div className="line">
                <div className="labellight">* Based on a regular 2000 calorie diet
                </div>
                </div>
                </td>
            </tr>
        </tbody></table>
      </div>
    )
  }
}

export default Nutrition;



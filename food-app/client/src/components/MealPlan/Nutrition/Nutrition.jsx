import React, { Component } from 'react';

class Nutrition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: [],
      calories: [],
      protein: [],
      fat: [],
      sugar: [],
      carbs: [],
    };
  };

  componentDidMount() {
    this.makeRequest(this.transform(this.props.recipe))
  }

  makeRequest = (param) => {
    var request = require("request");

    var options = {
      method: 'POST',
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: {
        'postman-token': 'e84dd3d8-9bab-43cc-fbfe-79124b07c6;a3',
        'cache-control': 'no-cache',
        accept: 'application/json',
        'content-type': 'application/json',
        'x-remote-user-id': '0',
        'x-app-key': 'aaf88207f36c8f1a7baf0e5f3da7bde7',
        'x-app-id': 'de975639'
      },
      body: {
        query: param,
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log('body', body.foods)

      var nameArr = [];
      var calArr = [];
      var proArr = [];
      var fatArr = [];
      var sugArr = [];
      var carbArr = [];

      body.foods.map((food) => {
        nameArr.push(food.food_name);
        calArr.push(food.nf_calories);
        proArr.push(food.nf_protein);
        fatArr.push(food.nf_total_fat);
        sugArr.push(food.nf_sugars);
        carbArr.push(food.nf_total_carbohydrate)
      })
    console.log('name', nameArr, 'fat', fatArr);
    });
  }

  render() {

    this.transform = (props) => {
      let string = [];
      console.log('props', props);
      while (props.length > 0) {
        let chunk = " " + (props.splice(0, 3).join(" "));
        string.push(chunk);
      }
      var q = string.toString().substring(1);
      return q;
    }

    return (
      <div style={{float: 'right'}}>
      <h3>Nutrition</h3>
      <h6>{this.props.recipe[0]}</h6>
      </div>
    )
  }
};

export default Nutrition;
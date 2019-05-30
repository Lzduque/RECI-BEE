import React, { Component } from 'react';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false };
  };

  saveRecipe = () => {
    if (!this.state.saved) {
      this.setState({ saved: true });
    } else {
      this.setState({ saved: false });
    }
  };

  componentDidMount() {

    fetch(`/api/books/${this.props.recipe.id}`, {
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
        throw new Error('Something went wrong ...');
      }
    })
    .then(recipeIsSaved => {
        console.log('recipe if saved?', recipeIsSaved);

        if (recipeIsSaved) {
          // this.setState = { saved: true };
          this.saveRecipe();
          console.log("is being set to TRUE")
          console.log("this.state.saved should be TRUE now: ", this.state.saved)
        } else {
          // this.setState = { saved: false };
          this.saveRecipe();
          console.log("is being set to FALSE")
          console.log("this.state.saved should be FALSE now: ", this.state.saved)
        }
    })
    .catch(error => this.setState({ error }))
    .then(() => console.log("this.state.saved final after fetch: ", this.state.saved));

  };

  render() {
    console.log("this.state.saved now: ", this.state.saved)
    return (
      <div className='popup' >
        <div className='popup-inner' >
          <h1>{ this.props.recipe.name }</h1>
          <p>Type: {this.props.recipe.meal_type} Servings: {this.props.recipe.servings}, Time: {this.props.recipe.time}min</p>
          <img alt={this.props.recipe.name} src={this.props.recipe.image} width={200} height={200}/>
          <pre>{this.props.recipe.preparation}</pre>
          <button onClick={this.props.closePopup}>CLOSE</button>
          <button onClick={() => this.saveRecipe()}>
          { this.state.saved ? `♥` : `♡` } </button>
        </div>
      </div>
    )
  }
};

export default ViewRecipe;


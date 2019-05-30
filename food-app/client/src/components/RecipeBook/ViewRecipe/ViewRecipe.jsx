import React, { Component } from 'react';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false };
  };

  // save recipe in recipe and in Db or unsave it and remove it
  saveRecipe = () => {
    if (!this.state.saved) {
      this.setState({ saved: true },
      this.saveInDB()
      );
    } else {
      this.setState({ saved: false },
      this.removeFromDB()
      );
    }
  };

  // save recipe in Db for a user
  saveInDB = () => {
    fetch(`/api/books?id=${this.props.recipe.id}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("response is happening inside save in DB")
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .catch(error => this.setState({ error }));

  }

  // remove recipe in Db for a user
  removeFromDB = () => {
    fetch(`/api/books/${this.props.recipe.id}`, {
      method: 'DELETE',
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
    .catch(error => this.setState({ error }));

  }

  componentDidMount() {
    // check recipe in Db for a user
    fetch(`/api/books/${this.props.recipe.id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("response is happening inside query DB")
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong inside query DB...');
      }
    })
    .then(recipeIsSaved => {
        console.log('recipe if saved after query DB?', recipeIsSaved);

        if (recipeIsSaved) {
          // this.setState = { saved: true };
          this.saveRecipe();
          console.log("is being set to TRUE")
          // console.log("this.state.saved should be TRUE now: ", this.state.saved)
        } else {
          // this.setState = { saved: false };
          // this.saveRecipe();
          console.log("this.state.saved is FALSE")
          // console.log("this.state.saved should be FALSE now: ", this.state.saved)
        }
    })
    .catch(error => this.setState({ error }))
    .then(() => console.log("this.state.saved final after fetch: ", this.state.saved));

  };

  render() {
    return (
      <div className='popup' >
        <div className='popup-inner' >
          <h1>{ this.props.recipe.name }</h1>
          <p>Type: {this.props.recipe.meal_type} | Servings: {this.props.recipe.servings} | Time: {this.props.recipe.time}min</p>
          <img alt="" src={this.props.recipe.image} width={200} height={200}/>
          <pre>{this.props.recipe.preparation}</pre>
          <button onClick={this.props.closePopup}>CLOSE</button>
          <button onClick={() => this.saveRecipe()}>
          { this.state.saved ? `♥` : `♡` } </button>
          STATE
          <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
          PROPS
          <pre style={{marginTop: '1em'}}>{JSON.stringify(this.props, null, '\t')}</pre>
        </div>
      </div>
    )
  }
};

export default ViewRecipe;


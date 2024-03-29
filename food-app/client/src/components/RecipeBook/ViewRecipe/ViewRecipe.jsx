import React, { Component } from 'react';

const ingredientQuantityForRecipe = (quantities, id) => {
 return quantities.find(element => element.recipe_id === id).quantity
}

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
    //
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
    let ingredientsList = () => {
      console.log("inside ingredients")
      console.log("this.props.recipe: ", this.props.recipe)
      return this.props.recipe.ingredients.map((ingredient) => (<li key={ingredient.id}>{ingredientQuantityForRecipe(ingredient.quantities, this.props.recipe.id)} {ingredient.unit} {ingredient.name}</li>))
    }

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
      <div className='popup' id='recipe-popup' >
        <div className='popup-inner view-recipe print' >
          <div className="page-title">
            <h2>{ this.props.recipe.name }</h2>
            <button className="save-button" onClick={() => this.saveRecipe()}>
            { this.state.saved ? ` ♥ ` : ` ♡ ` } </button>
            <button className="print-button" onClick={print}>Print Recipe</button>
            <button className="close-button" onClick={this.props.closePopup}>&#160;X&#160;</button>
          </div>
          <div className="view-recipe-field">
            <h6>Type: {this.props.recipe.meal_type} | Servings: {this.props.recipe.servings} | 🕒 {this.props.recipe.time}min</h6>
          </div>
          <div className="view-recipe-field">
            <div className="view-recipe-ingredients">
              <h5>Ingredients:</h5>
              <ul>
                { ingredientsList() }
              </ul>
            </div>

            <div className="view-recipe-img">
              <img alt={this.props.recipe.name} src={this.props.recipe.image}/>
            </div>
          </div>
          <div className="view-recipe-field-preparation">
            <h5>Preparation:</h5>
            <pre>{this.props.recipe.preparation}</pre>
          </div>
          {/* STATE
          <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
          PROPS
          <pre style={{marginTop: '1em'}}>{JSON.stringify(this.props, null, '\t')}</pre> */}
        </div>
      </div>
    )
  }
};


export default ViewRecipe;


import React, { Component } from 'react';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false };
    this.saveRecipe = this.saveRecipe.bind(this)
  }

  saveRecipe() {
    this.setState(function(prevState) {
      return { saved: !prevState.saved };
    });
  }

  render() {
    return (
      <div className='popup' style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        backgroundColor: 'rgba(0,0,0, 0.5)'
      }}>
        <div className='popup-inner' style={{
          position: 'fixed',
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          margin: 'auto',
          background: 'white'
        }}>
          <h1>{ this.props.recipe.name }</h1>
          <p>Type: {this.props.recipe.meal_type} Servings: {this.props.recipe.servings}, Time: {this.props.recipe.time}min</p>
          <img alt="" src={this.props.recipe.image} width={200} height={200}/>
          <pre>{this.props.recipe.preparation}</pre>
          <button onClick={this.props.closePopup}>CLOSE</button>
          <button onClick={() => this.saveRecipe}>
          { !this.state.saved ? `♥` : `♡` } </button>
        </div>
      </div>
    )
  }
};

export default ViewRecipe;


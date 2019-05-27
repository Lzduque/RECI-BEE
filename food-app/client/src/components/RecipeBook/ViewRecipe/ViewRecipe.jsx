import React, { Component } from 'react';
import SavedRecipe from '../SavedRecipe/SavedRecipe';

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
    console.log(this.state.saved)
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
        <div className='popup_inner' style={{
          position: 'fixed',
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          margin: 'auto',
          background: 'white'
        }}>
          <p>View Recipe Page</p>
          <h1>{this.props.text}</h1>
          <img src={this.props.image} width={200} height={200}/>
          <button onClick={this.props.closePopup}>CLOSE</button>
          <button onClick={ this.saveRecipe }>
          { !this.state.saved ? `♥` : `♡` } </button>
        </div>
      </div>
    )
  }
};

export default ViewRecipe;


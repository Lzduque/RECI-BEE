import React, { Component } from 'react';

class ViewRecipe extends Component {
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
          <h1 style={{
            margin: '0',
            padding: '0'
          }}>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>CLOSE</button>
        </div>
      </div>
    )
  }
};

export default ViewRecipe;


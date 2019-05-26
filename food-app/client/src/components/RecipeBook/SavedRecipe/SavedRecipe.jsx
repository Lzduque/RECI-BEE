import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

import rec1 from './rec1.jpg';
import rec2 from './rec2.jpg';
import rec3 from './rec3.jpg';

// console.log(rec1, rec2, rec3)

const images = [rec1, rec2, rec3];
const img_width = '300px';
const img_height = '300px';

const right = '-1';
const left = '+1';
// const CENTER = '0';

const buttonStyles = {
  height: img_height,
  color: "#eeeeee",
  fontSize: "2em",
};

class SavedRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageIdx: 0,
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(this.state.showPopup)
  }

  onClick(direction) {
    const change = direction === right ? right : left;
    const adjustedIdx = this.state.imageIdx + Number(change);
    let newIdx;
    if (adjustedIdx >= images.length) {
      newIdx = 0;
    } else if (adjustedIdx < 0) {
      newIdx = images.length - 1
    } else {
      newIdx = adjustedIdx;
    }
    this.setState({ imageIdx: newIdx });
  }

  render() {
    const { imageIdx = 0 } = this.state;
    const imageStyles = {
      order: 3,
      flexDirection: 'column',
      width: img_width,
      height: img_height,
      backgroundImage: `url(${images[imageIdx]})`
    };
    const searchStyle = {
      display: 'flex',
      flexDirection: 'column'
    };
    return (
      <div style={searchStyle}>
        <font align="center" size="3" color="green"><h1>Saved Recipes</h1></font>
      <div className="carouselContainer">
        <div style={imageStyles}>
          <button
            onClick={()=>this.onClick(right)}
            className="hollow float-left"
            style={buttonStyles}>⇦</button>
          <button
            onClick={()=>this.onClick(left)}
            className="hollow float-right"
            style={buttonStyles}>⇨</button>
          <button
            onClick={this.togglePopup.bind(this)}
            className="hollow center"
            style={buttonStyles}>⇪</button>
              { this.state.showPopup ?
                <ViewRecipe text="Hello Sahanah" closePopup={this.togglePopup.bind(this)}/>
                : null }
          </div>
        </div>
        <font align="center" size="1">Recipe: {imageIdx + 1}</font>
      </div>
    )
  }
};

export default SavedRecipe;
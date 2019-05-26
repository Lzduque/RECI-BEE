import React, { Component } from 'react';

import rec1 from './rec1.jpg';
import rec2 from './rec2.jpg';
import rec3 from './rec3.jpg';

// console.log(rec1, rec2, rec3)

const IMAGES = [rec1, rec2, rec3];
const IMG_WIDTH = '300px';
const IMG_HEIGHT = '300px';

const RIGHT = '-1';
const LEFT = '+1';
const CENTER = '0';

const buttonStyles = {
  height: IMG_HEIGHT,
  color: "#eeeeee",
  fontSize: "2em",
};

class SearchRecipe extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { imageIdx: 0 };
  }

  onClick(direction) {
    if (direction === CENTER) {
      return alert("GO TO VIEW")
    }
    const change = direction === RIGHT ? RIGHT : LEFT;
    const adjustedIdx = this.state.imageIdx + Number(change);
    let newIdx;
    if (adjustedIdx >= IMAGES.length) {
      newIdx = 0;
    } else if (adjustedIdx < 0) {
      newIdx = IMAGES.length - 1
    } else {
      newIdx = adjustedIdx;
    }
    this.setState({ imageIdx: newIdx });
  }

  render() {
    const { imageIdx = 0 } = this.state;
    const imageStyles = {
      width: IMG_WIDTH,
      height: IMG_HEIGHT,
      backgroundImage: `url(${IMAGES[imageIdx]})`
    };
    return (
      <div className="swipeContainer">
        <div>Image: {imageIdx + 1}</div>
        <div style={imageStyles}>
          <button
            onClick={()=>this.onClick(RIGHT)}
            className="hollow float-left"
            style={buttonStyles}>⇦</button>
          <button
            onClick={()=>this.onClick(LEFT)}
            className="hollow float-right"
            style={buttonStyles}>⇨</button>
            <div style={{
              display: 'flex',
              justifyContent:'center',
              alignItems:'center'
              }}>
            <button
              onClick={()=>this.onClick(CENTER)}
              className="hollow center"
              style={buttonStyles}>⇪</button>
            </div>
          </div>
        </div>
    )
  }
};

export default SearchRecipe;








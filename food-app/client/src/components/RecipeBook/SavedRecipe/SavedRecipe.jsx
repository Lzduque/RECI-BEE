import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

import rec1 from './rec1.jpg';
import rec2 from './rec2.jpg';
import rec3 from './rec3.jpg';

// console.log(rec1, rec2, rec3)

// function getFavRecipes(id, cb) {
//   let url = '/api/SavedRecipes/' + id;
//   fetch(url).then(response =>
//     {
//     return response
//   }).then(checkStatus).then(cb)
// }

const images = [rec1, rec2, rec3];
const imgWidth = '300px';
const imgHeight = '300px';

const right = '-1';
const left = '+1';

const buttonStyles = {
  height: imgHeight,
  color: "#eeeeee",
  fontSize: "2em",
};

class SavedRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(this.state.showPopup)
  }

  onClick(direction) {
    const change = direction === right ? right : left;
    const changedIndex = this.state.imageIndex + Number(change);
    let newIndex;
    if (changedIndex >= images.length) {
      newIndex = 0;
    } else if (changedIndex < 0) {
      newIndex = images.length - 1
    } else {
      newIndex = changedIndex;
    }
    this.setState({ imageIndex: newIndex });
  }

  render() {
    const { imageIndex = 0 } = this.state;
    const imageStyles = {
      order: 3,
      flexDirection: 'column',
      width: imgWidth,
      height: imgHeight,
      backgroundImage: `url(${images[imageIndex]})`
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
            onClick={this.togglePopup}
            className="hollow center"
            style={buttonStyles}>⇪</button>
              { this.state.showPopup ?
                <ViewRecipe text="Hello Sahanah" closePopup={this.togglePopup} image={images[imageIndex]}/>
                : null }
          </div>
        </div>
        <font align="center" size="1">Recipe: {imageIndex + 1}</font>
      </div>
    )
  }
};

export default SavedRecipe;
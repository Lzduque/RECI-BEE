import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

// import rec1 from './rec1.jpg';
// import rec2 from './rec2.jpg';
// import rec3 from './rec3.jpg';

const images = [];
// rec1, rec2, rec3
// const imgWidth = '500px';
// const imgHeight = '500px';

const right = '-1';
const left = '+1';

class SavedRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      showPopup: 0,
      savedRecipes: []
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {

    fetch('/api/recipes/')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(recipes => {
          console.log('recipes', recipes);
        this.setState({
          savedRecipes: recipes.reduce(
            (acc, item) => Object.assign(acc, {
              [item.id]: item
            }), {})
        })
      })
      .catch(error => this.setState({ error }))
      .then(() => console.log(this.state.savedRecipes));
  }

  togglePopup(id) {
    this.setState({
      showPopup: id
    });
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

    // console.log(this.state.savedRecipes);
    const imageStyles = url => ({
      width: '100%',
      height: '500px',
      backgroundImage: `url(${url})`,
      backgroundAttachment: 'flex',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    });

    return (
      <div className="search-container">
        <font align="center" size="3" color="green"><h1>Saved Recipes</h1></font>
        <div className="carousel-container">
          {Object.values(this.state.savedRecipes).map(
            recipe => (
              <div style={imageStyles(recipe.image)} key={recipe.id}>
                <button
                  onClick={()=>this.onClick(right)}
                  className="slide-right">⇦</button>
                <button
                  onClick={()=>this.onClick(left)}
                  className="slide-left">⇨</button>
                <button
                  onClick={() => this.togglePopup(recipe.id)}
                  className="slide-center">⇪</button>
              </div>
              ))}
            {this.state.showPopup > 0 && (
              <ViewRecipe
                closePopup = {() => this.togglePopup(0)}
                recipe = {this.state.savedRecipes[this.state.showPopup]}
              />)}
        </div>
        <font align="center" size="1">Recipe: {imageIndex}</font>
      </div>
    )
  }
};

export default SavedRecipe;
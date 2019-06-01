import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

// eslint-disable-next-line

const right = '-1';
const left = '+1';

class SavedRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      showPopup: 0
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(id) {
    this.setState({
      showPopup: id
    }, () => {
      console.log('change recipe state');
      this.props.changeRecipeState();
    });
    // console.log('id', id);
  }

  onClick(direction) {
    const recipes = this.props.savedRecipes;
    const change = direction === right ? right : left;
    const changedIndex = this.state.imageIndex + Number(change);
    let newIndex;
    if (changedIndex >= recipes.length) {
      newIndex = 0;
    } else if (changedIndex < 0) {
      newIndex = recipes.length - 1
    } else {
      newIndex = changedIndex;
    }
    // console.log('click, oldindex', this.state.imageIndex, 'click newIndex', newIndex, 'direction', direction);
    this.setState({ imageIndex: newIndex });
  }

  render() {
    const { imageIndex = 0 } = this.state;

    // console.log(this.props.savedRecipes);
    const imageStyles = url => ({
      width: '100%',
      height: '500px',
      backgroundImage: `url(${url})`,
      backgroundAttachment: 'flex',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    });

    const recipe = this.props.savedRecipes[imageIndex];
    // console.log('recipe', recipe);
    //if recipe, render otherwise loading screen
    if (!recipe) {
      return false;
      //show spinner here
    }
    return (
      <div className="search-container">
        <font align="center" size="3" color="goldenrod"><h1>Saved Recipes</h1></font>
        <div className="carousel-container">
              <div style={imageStyles(recipe.image)} key={recipe.id}>
                <button
                  onClick={()=>this.onClick(right)}
                  className="click-right">⇦</button>
                <button
                  onClick={() => this.togglePopup(recipe.id)}
                  className="click-center">⇪</button>
                <button
                  onClick={()=>this.onClick(left)}
                  className="click-left">⇨</button>
              </div>
            {this.state.showPopup > 0 && (
              <ViewRecipe
                closePopup={() => this.togglePopup(0)}
                recipe={this.props.savedRecipesByID[this.state.showPopup]}
              />)}
        </div>
        <font align="center" size="1">Recipe: {imageIndex}</font>
      </div>
    )
  }
};

export default SavedRecipe;

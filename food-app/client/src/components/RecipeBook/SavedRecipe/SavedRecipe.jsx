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
      showPopup: false,
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
      .then(savedRecipes => this.setState({ savedRecipes }))
      .catch(error => this.setState({ error }))
    }

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
      console.log(this.state.showPopup)
    }

        // {
        //   props.cards.map((card) => (
        //     <button className="cards-button" key={ card.id} onClick={ onClickCard }><Card
        //       key={ card.id }
        //       title={ card.title }
        //       content={ card.content }
        //       imgUrl={ card.imgUrl }
        //       state={ card.state }
        //       /></button>
        //   ))
        // }

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

    this.state.savedRecipes.map((recipe) => {
      console.log(recipe);
      let img = recipe.image;
      return images.push(img);
    })

    const imageStyles = {
      width: '100%',
      height: '500px',
      backgroundImage: `url(${images[imageIndex]})`,
      backgroundAttachment: 'flex',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    };

    return (
      <div className="search-container">
        <font align="center" size="3" color="green"><h1>Saved Recipes</h1></font>
      <div className="carousel-container">
        <div style={imageStyles}>
          <button
            onClick={()=>this.onClick(right)}
            className="slide-right">⇦</button>
          <button
            onClick={()=>this.onClick(left)}
            className="slide-left">⇨</button>
          <button
            onClick={this.togglePopup}
            className="slide-center">⇪</button>
              { this.state.showPopup ?
                <ViewRecipe closePopup={this.togglePopup} image={images[imageIndex]} recipe={this.state.savedRecipes}/>
                : null }
          </div>
        </div>
        <font align="center" size="1">Recipe: {imageIndex + 1}</font>
      </div>
    )
  }
};

export default SavedRecipe;
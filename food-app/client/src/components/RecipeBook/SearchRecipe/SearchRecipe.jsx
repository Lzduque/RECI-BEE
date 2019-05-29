import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe.jsx';

const RecipeCard = (props) => (
  <div className="recipe-card">
    <img className="recipe-image" src={ props.image } alt={ props.alt || 'Image' }/>
    <div className="recipe-content">
      <p className="recipe-title">{ props.name }</p>
    </div>
  </div>
);

const CardContainer = (props) => {

  const onClickCard = (id) => (evt) => {
    console.log(evt.target)
    props.onCardSelected(id);
  }

  return (
    <div className="card-container">
      {
        props.cards.map((recipe) => (
          <div className="card-button" key={ recipe.id } onClick={ onClickCard(recipe.id) }><RecipeCard
            key={ recipe.id }
            name={ recipe.name }
            image={ recipe.image }
            />
          </div>
        ))
      }
    </div>
  );
};

class SearchRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: 0,
      selectedRecipe: null,
      recipes: []
    }
  }

  //getRecipeByID(id) {
    //if recipe.id == id , then return recipe.obj else return null
  }
  render() {

    const recipe = [
      {
        id: 1,
        name: "Roasted Cauliflower Lentil Curry",
        image: "https://static.wixstatic.com/media/26357d_c27847b36be6429ba735bd715378bd59~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_c27847b36be6429ba735bd715378bd59~mv2_d_6000_4000_s_4_2.webp",
        servings: 6,
        time: 70,
        preparation: " 1. Preheat the oven to 400 F/ 210 C. 2. Toss the cauliflower with the oil and spices until coated. 3. Spread evenly on a baking tray lined with baking paper or tinfoil. 4. Roast for 40-50 minutes, until crispy and golden, stopping to mix once halfway. 5. In a large pot on medium heat, cook the onions in the oil, until soft and slightly golden. 6. Add splashes of water if needed to prevent burning or sticking in the pot. 7. Once soft, add the garlic and all the spices, and stir until fragrant (about 1 minutes). 8. Add the can of tomatoes and diced tomatoes, and stir to combine everything. 9. Allow to simmer for 5 minutes. 10. Finally, add the coconut milk, lentils, spinach, and roasted cauliflower, and mix until everything is combined and heated through, about 5 minutes. 12. Serve with rice, and enjoy!",
        meal_type: "meal"
      },
      {
        id: 2,
        name: "Frozen Yogurt Breakfast Bars",
        image: "https://static.wixstatic.com/media/26357d_90b4cade532243748568d864fbc229f9~mv2_d_3582_5373_s_4_2.jpg/v1/fill/w_1260,h_1890,al_c,q_90,usm_0.66_1.00_0.01/26357d_90b4cade532243748568d864fbc229f9~mv2_d_3582_5373_s_4_2.webp",
        servings: 8,
        time: 15,
        preparation: " 1. First, stew the berries until soft, set aside to cool. 2. In a food processor, blend the dates until they are smooth, scraping down the sides as needed. Add the oatmeal, ground flaxseed, almond butter, and cinnamon and combine, scraping down the sides once or twice. 3. Transfer the mix to a parchment lined baking dish and press the base into the dish. 4. Top with the yogurt and spread out evenly. 5. Dot the yogurt with the stewed berries and use a knife to swirl. 6. Place into the freezer and let freeze for 1-2 hours, or until the bars are solid enough to cut. 7. When removed from the freezer, cut into squares or bars of desired size. 8. Let thaw for 3-5 minutes before eating. Enjoy!",
        meal_type: "breakfast"
      },
      {
        id: 3,
        name: "Garden Chickpea Dill Dip",
        image: "https://static.wixstatic.com/media/26357d_9ea67e5914e34c3c83dd6a79adf376ed~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_9ea67e5914e34c3c83dd6a79adf376ed~mv2_d_6000_4000_s_4_2.webp",
        servings: 4,
        time: 15,
        preparation: " 1. Add chickpeas to a large bowl and mash with a fork until all chickpeas are broken. 2. Add the remaining ingredients to the bowl and mix, mashing slightly. Chill before serving, if possible, to enhance flavours. Enjoy as-is like a salad, or with crackers and veggies, or spread onto a sandwich!",
        meal_type: "snack"
      }
    ];

    return (
      <div className="search-page">
        <h1 style={{ 'textAlign': 'center' }}>
          Recipe Search
        </h1>
        <CardContainer cards={ recipe } onCardSelected={this._recipeSelected}/>
        {
          this.state.selectedRecipe ? <ViewRecipe recipe={ recipe } closePopup={() => this.setState({ selectedRecipe: null }) } /> : null
        }
      </div>
    )
  }

  _recipeSelected = id => {
    this.setState({selectedRecipe: this.getRecipeByID(id) })
    console.log(id);
  }
};

export default SearchRecipe;



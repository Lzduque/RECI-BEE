import React, { Component } from 'react';
import ViewRecipe from '../ViewRecipe/ViewRecipe';

const Card = (props) => (
  <div className="card">
    <img className="card-img" src={ props.imgUrl } alt={ props.alt || 'Image' }/>
    <div className="card-content">
      <h2>{ props.title }</h2>
      <p>{ props.content }</p>
      <h6>{ props.state }</h6>
    </div>
  </div>
);


const onClickCard = ( evt ) => {
  console.log(evt)
}

const CardContainer = (props) => (

  <div className="cards-container">
    {
      props.cards.map((card) => (
        <button className="cards-button" key={ card.id} onClick={ onClickCard }><Card
          key={ card.id }
          title={ card.title }
          content={ card.content }
          imgUrl={ card.imgUrl }
          state={ card.state }
          /></button>
      ))
    }
  </div>
);

class SearchRecipe extends Component {

  render() {

    const cardsData = [
    {
      id: 1,
      title: 'RECIPE 1',
      content: 'Baked Buckwheat Pancakes',
      imgUrl: 'https://static.wixstatic.com/media/26357d_f6b265dfea8a45fb819eecb218e8603d~mv2_d_4000_6000_s_4_2.jpg/v1/fill/w_1260,h_1890,al_c,q_90,usm_0.66_1.00_0.01/26357d_f6b265dfea8a45fb819eecb218e8603d~mv2_d_4000_6000_s_4_2.webp',
      state: true
    },
    {
      id: 2,
      title: 'RECIPE 2',
      content: 'Bean & Oat Burger with 3-ingredient Cajun Mayo',
      imgUrl: 'https://static.wixstatic.com/media/26357d_a448d02540754527adf782f65a95b34c~mv2_d_2592_3888_s_4_2.jpg/v1/fill/w_1260,h_1890,al_c,q_90,usm_0.66_1.00_0.01/26357d_a448d02540754527adf782f65a95b34c~mv2_d_2592_3888_s_4_2.webp',
      state: true
    },
    {
      id: 3,
      title: 'RECIPE 3',
      content: 'Purple Burrito Bowl With Avocado Mango Salsa',
      imgUrl: 'https://static.wixstatic.com/media/26357d_1f83669e5fcd4c0884090855adad1c9a~mv2.jpg/v1/fill/w_683,h_1024,al_c,q_85/26357d_1f83669e5fcd4c0884090855adad1c9a~mv2.webp',
      state: true
    },
    {
      id: 4,
      title: 'RECIPE 4',
      content: 'Banana Coconut Lime Sorbet',
      imgUrl: 'https://static.wixstatic.com/media/26357d_c126eaddede64c2a8b4dc3b947cee15b~mv2_d_3456_5184_s_4_2.jpg/v1/fill/w_1260,h_1890,al_c,q_90,usm_0.66_1.00_0.01/26357d_c126eaddede64c2a8b4dc3b947cee15b~mv2_d_3456_5184_s_4_2.webp',
      state: true
    },
    {
      id: 5,
      title: 'RECIPE 5',
      content: 'Coconut Curry Cream of Squash Soup with Spiced Lentil Croutons',
      imgUrl: 'https://static.wixstatic.com/media/26357d_363c5eeb30b04f82bf9911571cb934c5~mv2_d_3888_2592_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_363c5eeb30b04f82bf9911571cb934c5~mv2_d_3888_2592_s_4_2.webp',
      state: true
    },
    {
      id: 6,
      title: 'RECIPE 6',
      content: 'Marinated Sesame Mushrooms',
      imgUrl: 'https://static.wixstatic.com/media/26357d_2703d1cc18d9458b9a25ec2302eb5f7a~mv2.jpg/v1/fill/w_1024,h_683,al_c,q_85/26357d_2703d1cc18d9458b9a25ec2302eb5f7a~mv2.webp',
      state: true
    },
    {
      id: 7,
      title: 'RECIPE 7',
      content: 'Chocolate Chia Breakfast Pudding',
      imgUrl: 'https://static.wixstatic.com/media/26357d_7195fe55859040cba59576d838a24ec8~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_7195fe55859040cba59576d838a24ec8~mv2_d_5184_3456_s_4_2.webp',
      state: true
    },
    {
      id: 8,
      title: 'RECIPE 8',
      content: 'Candied Coconut & Cinnamon Pecans',
      imgUrl: 'https://static.wixstatic.com/media/26357d_b1081d06969d455d80c78b45cd120431~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_b1081d06969d455d80c78b45cd120431~mv2_d_6000_4000_s_4_2.webp',
      state: true
    },
    {
      id: 9,
      title: 'RECIPE 9',
      content: 'Balsamic & Basil Bruschetta',
      imgUrl: 'https://static.wixstatic.com/media/26357d_6d6496eb237e4d358670db575dfb1ae7~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_6d6496eb237e4d358670db575dfb1ae7~mv2_d_6000_4000_s_4_2.webp',
      state: true
    },
    {
      id: 10,
      title: 'RECIPE 10',
      content: 'mushroom Risotto with Brown & Red Rice ',
      imgUrl: 'https://static.wixstatic.com/media/26357d_d79c01a32e744205bceece8aed0b309d~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1260,h_840,al_c,q_85,usm_0.66_1.00_0.01/26357d_d79c01a32e744205bceece8aed0b309d~mv2_d_6000_4000_s_4_2.webp',
      state: true
    },
  ];
    return (
      <div className="cards-page">
        <h1 style={{ 'textAlign': 'center' }}>
          Recipe Search
        </h1>
        <CardContainer cards={ cardsData } image={ cardsData.imgUrl }/>
      </div>
    )
  }
};

export default SearchRecipe;




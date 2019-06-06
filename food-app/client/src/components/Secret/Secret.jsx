import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import faisal from './faisal.jpeg';
import jon from './jon.jpg';
import louisa from './louisa.jpg';
import janelle from './janelle.jpeg';
import olivia from './olivia.jpg';
import will from './will.jpg';
import emma from './emma.jpg';
import nicole from './nicole.jpg';
import rafal from './rafal.jpg';
import mikias from './mikias.jpeg';
import monting from './monting.jpeg';
import justin from './justin.png';
import david from './david.jpeg';
import stosh from './stosh.jpeg';
import brian from './brian.png';
import martin from './martin.jpeg';
import hesham from './hesham.jpg';
import tim1 from './tim.jpg';
import vasiliy from './vasiliy.jpg';
import erica from './erica.jpg';
import juan from './juan.png';
import amy from './amy.jpg';
import tim from './tim.jpeg';
import carmen from './carmen.png';


class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        faisal,
        jon,
        louisa,
        janelle,
        olivia,
        will,
        emma,
        nicole,
        rafal,
        mikias,
        monting,
        justin,
        david,
        stosh,
        brian,
        martin,
        hesham,
        tim1,
        vasiliy,
        erica,
        juan,
        amy,
        tim,
        carmen
      ],
    }
  };


  render() {

    return (
      <Router>
      <div>
        <div className="container-1">
          <div className="page-title">
            <h2>Special Thanks to...</h2>
          </div>
          <div className="photos-container">
          {this.state.images.map((img) => {
            return <img className="photos" src={img} alt="img" />
          }
          )}
          </div>
        </div>
      </div>
    </Router>
    )
  }
};

export default Secret;

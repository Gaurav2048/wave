import React, { Component } from 'react'; 
import HomeSlider from './Home_slider'; 
import HomePromotion from './Home_promotion';


export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeSlider/>
        <HomePromotion/>
      </div>
    )
  }
}

import React, { Component } from 'react'; 
import HomeSlider from './Home_slider'; 
import HomePromotion from './Home_promotion';
import {getProductBySale, gtProductByArrival} from '../../actions/product_actions';
import {connect} from 'react-redux';
import CartBlock from '../../utils/cart_block';


class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getProductBySale())
      this.props.dispatch(gtProductByArrival())
  }
  render() {
    return (
      <div>
        <HomeSlider/>
        <CartBlock list={this.props.products.bySell} title="Best Selling Guiters"/>
        <HomePromotion/>
        <CartBlock list={this.props.products.byArrival} title="New Arrivals"/>
      </div>
     
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home)
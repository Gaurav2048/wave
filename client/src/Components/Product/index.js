import React, { Component } from 'react'
import PageTop from '../../utils/page_top';
import {connect} from 'react-redux';
import ProductInfo from './prodInfo'; 

import {getProductDetail,clearProductDetail} from '../../actions/product_actions';

class ProductPage extends Component {

    componentDidMount(){
        const id = this.props.match.params.id; 
        console.log("dds", id);
        this.props.dispatch(getProductDetail(id))
        
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }

  render() {
    return (
      <div>
          <PageTop title="Product Detail" />
            <div className="container">
                {
                    this.props.products.prodDetail ?
                        <div className="product_detail_wrapper">
                                <div className="left">
                                        images
                                </div>
                                <div className="right">
                                    <ProductInfo detail ={this.props.products.prodDetail} addToCart={(id)=>this.addToCArtHandler(id)} />
                                </div>
                            </div>
                    : 'loading'
                }
            </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductPage)
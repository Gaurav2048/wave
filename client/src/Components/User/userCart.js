import React, { Component } from 'react'
import UserLayout from '../../HOC/User';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import UserProductBlock from '../../utils/user/ProductBlock';
import {getCartItems} from '../../actions/user_action';



class userCart extends Component {

    state = {
        loading: true,
        total : 0,
        showTotal:false,
        showSuccess: false
    }

    componentDidMount(){
        let cartItem = []; 
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                    user.userData.cart.forEach(item =>{
                        cartItem.push(item.id)
                    })

                    this.props.dispatch(getCartItems(cartItem,user.userData.cart))
                            .then(()=>{
                                 
                                
                            })
            }
        }

    }

    removeItem(id){
        
    }

  render() {
    return (
        <UserLayout>
            <h1>USer Cart</h1>
            <div className="user_cart">
                <UserProductBlock  products={this.props.user} type="cart" removeItem={(id)=>this.removeItem(id)}  />

            </div>
        </UserLayout>
    )
  }
}

const mapStateToProps = (state) =>{
    return {
        user:state.user
    }
}


export default connect(mapStateToProps)(userCart)
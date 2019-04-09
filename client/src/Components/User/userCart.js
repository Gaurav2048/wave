import React, { Component } from 'react'
import UserLayout from '../../HOC/User';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import UserProductBlock from '../../utils/user/ProductBlock';
import { getCartItems, removeCartAction } from '../../actions/user_action';



class userCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }

    componentDidMount() {
        let cartItem = [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                })

                this.props.dispatch(getCartItems(cartItem, user.userData.cart))
                    .then(() => {

                        if (this.props.user.cartDetail.length > 0) {
                            this.calculateTotal(this.props.user.cartDetail);


                        }

                    })
            }
        }

    }

    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        this.setState({
            total,
            showTotal: true
        })
    }

       showNullItem =()=>(
            <div className="cart_no_items">
                    <FontAwesomeIcon icon = {faFrown} />
                    <div>You have no items</div>
            </div>
        )

    removeItem = (id) => {
            this.props.dispatch(removeCartAction(id)).then(()=>{
                if(this.props.user.cartDetail <=0){
                    this.setState({showTotal:false})
                }else {
                    this.calculateTotal(this.props.user.cartDetail)
                }
            })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>USer Cart</h1>
                    <div className="user_cart">
                        <UserProductBlock products={this.props.user} type="cart" removeItem={(id) => this.removeItem(id)} />

                        {
                            this.state.showTotal ? <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: ${ this.state.total  }
                                    </div>
                                </div>
                            </div> : 
                            
                            this.state.showSuccess ? 

                            <div className="cart_no_items">
                                     <FontAwesomeIcon icon = {faSmile} />
                                     <div>Items Placed</div>
                             </div>
                            :
                             this.showNullItem()
                        }
        
            </div>
            {
                this.state.showTotal ?          
                    <div className="payal_button_container">
                            Paypal
                    </div>

                : null
            }
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(userCart)
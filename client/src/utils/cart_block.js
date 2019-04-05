import React from 'react'; 
import Card from './Card'; 




const CartBlock = (props) => {


    const renderCard = () =>(
        props.list ?
        props.list.map((card, i) => (
                <Card 
                    key = {i}
                    {...card}
                />
        ))
        : null  
    )

    return (
        <div className="cart_block">
                <div className="container">
                        {
                            props.title? 
                                <div className="title">
                                        {props.title}
                                </div>
                            :null
                        }

                        <div style={{display: 'flex',
                                    flexWrap: 'wrap'
                        }}>
                            {renderCard(props.list)}
                        </div>
                </div>
        </div>
    )
}

export default CartBlock; 
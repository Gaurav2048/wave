import React from 'react';
import CartBlockShop from '../../utils/Form/cart_block_shop';


const LoadmoreCart = (props) => {
    return (
        <div>
            <div>
                <CartBlockShop
                    grid={props.grid}
                    list={props.products}
                />
            </div>
            {
                props.size > 0 && props.size >= props.limit ?
                    <div className="load_more_container">
                        <span onClick={() => props.loadMore()}>
                            Load More
                    </span>
                    </div> : null
            }
        </div>
    )
}

export default LoadmoreCart; 
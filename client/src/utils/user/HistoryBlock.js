import React from 'react';
import moment from 'moment';


const UserHistoryBlock =(props) =>{

    const renderBlock = ()=>(

        props.products ? 
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>
                        {moment(product.dateOfPurchase).format("MM-DD-YYYY")}
                    </td>
                    <td>
                            {product.brand} {product.name}
                    </td>
                    <td>
                        {product.price}
                    </td>
                    <td>
                        {product.quantity}
                    </td>
                </tr>
            ))

        : null

    )

    return (
        <div className="history_block">
            <table>
            
            <tr>
                <th>Date of Purchase</th>
                <th>Product</th>
                <th>Price Paid</th>
                <th>Quantity</th>
            </tr>
            {renderBlock()}

            </table>
        </div>
    )
}

export default UserHistoryBlock; 
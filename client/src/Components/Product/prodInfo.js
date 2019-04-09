import React from 'react';
import MyButton from '../../utils/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProductInfo = (props)=>{
    const detail = props.detail;
    return ( 
        <div>
            <h1> {detail.brand.name} {detail.name} </h1>
            <p> {detail.description} </p>
        </div>
    )
}

export default ProductInfo; 
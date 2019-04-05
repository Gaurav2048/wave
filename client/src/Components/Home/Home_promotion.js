import React from 'react';
import MyButton from '../../utils/Button';


const HomePromotion = () => {

    const promotion = {
        img: 'images/featured/featured_home_3.jpg',
        lineOne: 'Up To 40% Off',
        lineTwo: 'In Second hand Guiters',
        linkTitle: 'Shop Now',
        linkTo: '/shop'

    }

    const renderPromition = () => (
        promotion ?
            <div className="home_promotion_img" style={{ background: `url(${promotion.img})` }}>

                <div className="tag title">  {promotion.lineOne}</div>
                <div className="tag low_title"> {promotion.lineTwo}</div>
                <div> <MyButton type="default" title={promotion.linkTitle} linkTo={promotion.linkTo} addStyles={{ margin: '10px 0 0 0' }} /> </div>
            </div>
            : null
    )

    return (
        <div className="home_promotion">
            {renderPromition()}
        </div>
    )

}


export default HomePromotion; 
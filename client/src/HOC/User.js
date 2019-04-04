import React from 'react'; 
import {Link }  from 'react-router-dom';

const Links = [
    {
        name: 'My Account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'USer information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/usr_cart'
    }
]

const UserLayout =(props) => {

    const generateLinks = (links) => (
        links.map((item, i) =>(
            <Link to ={item.linkTo} key = {i} >{item.name}</Link>
        ))
    )

    return (
        <div className="container">
                <div className="user_container">
                    <div className="user_left_nav">
                        <h2>User Account</h2>
                        <div className="links">
                            {generateLinks(Links)}
                        </div>
                    </div>

                    <div className="user_right">
                            {props.children}
                    </div> 
                </div>
        </div>
    )
}

export default UserLayout; 
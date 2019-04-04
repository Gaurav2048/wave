import React from 'react'; 
import UserLayout from '../../HOC/User';
import MyButton from '../../utils/Button'; 


const UserDashboard = () =>{
    return (
        <div >  
            <UserLayout >
                <div className="user_nfo_panel">
                        <h1>User Information</h1>
                        <div>
                            <span>name</span>
                            <span>Last name</span>
                            <span>Email</span>
                        </div>
                        <MyButton type = "default"  title = "Edit account info "  linkTo = "/user/user_profile"/>
                    <div className="user_nfo_panel">
                             <h1>History Purchase</h1>
                            <div className="user_product_block_wrapper">
                                    history 
                            </div>
                    </div>
 
                </div>
            </UserLayout> 
        </div>
    )
}

export default UserDashboard;
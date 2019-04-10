import React from 'react'; 
import UserLayout from '../../HOC/User';
import MyButton from '../../utils/Button'; 
import UserHistoryBlock from '../../utils/user/HistoryBlock';
import User from '../../HOC/User';



const UserDashboard = ({user}) =>{
    return (
        <div >  
            <UserLayout >
                <div className="user_nfo_panel">
                        <h1>User Information</h1>
                        <div>
                            <span>{user.userData.name}</span>
                            <span>{user.userData.lastname}</span>
                            <span>{user.userData.email}</span>
                        </div>
                        <MyButton type = "default"  title = "Edit account info "  linkTo = "/user/user_profile"/>
                  
                  {
                    user.userData.history ?   

                      <div className="user_nfo_panel">
                             <h1>History Purchase</h1>
                            <div className="user_product_block_wrapper">
                                    <UserHistoryBlock   products={user.userData.history} />
                            </div>
                    </div>

                      : null
                  }

                    
 
                </div>
            </UserLayout> 
        </div>
    )
}

export default UserDashboard;
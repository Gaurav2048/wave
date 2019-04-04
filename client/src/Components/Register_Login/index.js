import React from 'react'; 
import MyButton from './../../utils/Button';
import Login from './login'; 


const RegisterLogin = () => {

    return(
        <div>
            <div className="paper_wrapper">
                    <div className="container">

                        <div className="register_login_container">
                            <div className="left">
                                <h1>New Customers</h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                    Rerum maxime non unde. 
                                    </p>
                                <MyButton type="default"  title="Create An Account" linkTo ="/register" addStyle={{ margin:'10px,0,0,0' }}/>
                            </div>
                            <div className="right">
                               <h2>Register At Customers</h2> 
                                <p>If you have an account please login.</p>
                                <Login/> 
                            </div>
                        </div>

                    </div>
            </div>
        </div>
    )

}

export default RegisterLogin; 
import React from 'react'; 
import MyButton from './../../utils/Button';


const RegisterLogin = () => {

    return(
        <div>
            <div className="paper_wrapper">
                    <div className="container">

                        <div className="register_login_container">
                            <div className="left">
                                <h1>New Customers</h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                    Rerum maxime non unde. Explicabo necessitatibus, consectetur 
                                    rem laudantium molestiae nesciunt libero ullam omnis, unde tenetur 
                                    quasi assumenda voluptatum, laboriosam itaque dolore.</p>
                                <MyButton type="default"  title="Create An Account" linkTo ="/register" addStyle={{ margin:'10px,0,0,0' }}/>
                            </div>
                            <div className-="right">
                               <h2>Register At Customers</h2> 
                                <p>If you have an account please login.</p>
                                LOGIN
                            </div>
                        </div>

                    </div>
            </div>
        </div>
    )

}

export default RegisterLogin; 
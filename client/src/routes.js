import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Components/Home';
import Layout from './HOC/layout';
import Register from './Components/Register_Login/Register';
import Auth from './HOC/Auth';
import Shop from './Components/Shop/index'; 
import UserDashboard from './Components/User/index';
import RegisterLogin from './Components/Register_Login/index'; 


const Routes = () =>{
  return(
    <Layout>
    <Switch>
      <Route path="/" exact component={Auth(Home, null)}/>
      <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
      <Route path="/register" exact component={Auth(Register, false)}/>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
      <Route path="/shop" exact component={Auth(Shop, null)}/>

    </Switch>
    </Layout>
  )
}

export default Routes;

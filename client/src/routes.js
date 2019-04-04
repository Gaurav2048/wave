import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Components/Home';
import Layout from './HOC/layout';
import Register from './Components/Register_Login/Register';
import UserDashboard from './Components/User/index';
import RegisterLogin from './Components/Register_Login/index'; 


const Routes = () =>{
  return(
    <Layout>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/register_login" exact component={RegisterLogin}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/user/dashboard" exact component={UserDashboard}/>

    </Switch>
    </Layout>
  )
}

export default Routes;

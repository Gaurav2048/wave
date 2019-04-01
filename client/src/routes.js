import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Components/Home';
import Layout from './HOC/layout';
import RegisterLogin from './Components/Register_Login/index'; 


const Routes = () =>{
  return(
    <Layout>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/register_login" exact component={RegisterLogin}/>

    </Switch>
    </Layout>
  )
}

export default Routes;

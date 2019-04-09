import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Components/Home';
import Layout from './HOC/layout';
import Register from './Components/Register_Login/Register';
import Auth from './HOC/Auth';
import Shop from './Components/Shop/index'; 
import AddProduct from './Components/User/Admin/Add_Product'
import UserDashboard from './Components/User/index';
import ProductPage from './Components/Product/index'; 
import userCart from './Components/User/userCart'; 
import RegisterLogin from './Components/Register_Login/index'; 
import ManageCategories from './Components/User/Admin/ManageCategories';

const Routes = () =>{
  return(
    <Layout>
    <Switch>
      <Route path="/" exact component={Auth(Home, null)}/>
      <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
      <Route path="/register" exact component={Auth(Register, false)}/>
      <Route path="/user/cart" exact component={Auth(userCart, true)}/>
      <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)}/>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
      <Route path="/admin/add_products" exact component={Auth(AddProduct, true)}/>
      <Route path="/admin/manage_Categories" exact component={Auth(ManageCategories, true)}/>
      <Route path="/shop" exact component={Auth(Shop, null)}/>

    </Switch>
    </Layout>
  )
}

export default Routes;

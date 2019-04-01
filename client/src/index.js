import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';
import {Provider } from 'react-redux'; 
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import { createStore, applyMiddleware } from 'redux';  
import promiseMiddleware  from 'redux-promise';
import reduxThunk from 'redux-thunk'; 


import Reducer from './Reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore); 


ReactDOM.render( 
<Provider store = {createStoreWithMiddleware(Reducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
<BrowserRouter>
<Routes />
</BrowserRouter>
</Provider>
, document.getElementById('root'));
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 

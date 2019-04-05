import axios from 'axios';
import { PRODUCT_SERVER } from '../utils/misc';
import { GET_PRODUCT_BYSALE, GET_PRODUCT_BY_ARRIVAL, GET_BRANDS, GET_WOODS } from './types';


export function getProductBySale() {

    const request = axios.get(`${PRODUCT_SERVER}/article?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCT_BYSALE,
        payload: request
    }

}


export function gtProductByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/article?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }

}


/////////////////////////////
///             
///          CATEGORIES          
///
////////////////////////////


export function getBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/get_brands`)
        .then(response => response.data);

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
        .then(response => response.data);

    return {
        type: GET_WOODS,
        payload: request
    }
}
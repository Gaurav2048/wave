import axios from 'axios';
import { PRODUCT_SERVER } from '../utils/misc';
import { GET_PRODUCT_BYSALE,
     GET_PRODUCT_BY_ARRIVAL,
     GET_BRANDS,
     GET_WOODS ,
     GET_PRODUCT_TO_SHOP,
     ADD_PRODUCT,
     CLEAR_PRODUCT,
     ADD_BRAND,
     GET_PRODUCT_DETAIL,
     CLEAR_PRODUCT_DETAIL
    } from './types';


export function getProductBySale() {

    const request = axios.get(`${PRODUCT_SERVER}/article?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCT_BYSALE,
        payload: request
    }

}


export function getProductsToShop(skip, limit,filters = [] , previousState=[]){
    const data ={
        skip, 
        limit,
        filters
    }

    const request= axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ]
            return {
                size: response.data.size, 
                articles: newState
            }
    });

    return {
        type: GET_PRODUCT_TO_SHOP,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    } 
}

export function clearProductDetail(){
    return {
        type:CLEAR_PRODUCT_DETAIL,
        payload: ''
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


export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/article_by_id/?id=${id}&type=array`)
                        .then((response)=>{
                            return response.data[0]
                        })

                        return {
                            type: GET_PRODUCT_DETAIL,
                            payload:request
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


export function addProduct(dataTOoSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataTOoSubmit).then(response => response.data);
    return {
        type:ADD_PRODUCT,
        payload: request
    }
}



//Brnad


export function addBrand(dtaToSubmit, existingBrands){
        const request = axios.post(`${PRODUCT_SERVER}/brand`, dtaToSubmit).then(response => {
            let brands = [
                ...existingBrands,
                response.data.brand
            ];
            return {
                success: response.data.success,
                brands
            }
        })

        return {
            type: ADD_BRAND,
            payload:request
        }

    }

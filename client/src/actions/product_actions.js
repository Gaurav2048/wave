import axios from 'axios'; 
import {PRODUCT_SERVER} from '../utils/misc'; 
import {GET_PRODUCT_BYSALE, GET_PRODUCT_BY_ARRIVAL} from './types';


export function getProductBySale(){

   const request = axios.get(`${PRODUCT_SERVER}/article?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

                    return {
                        type: GET_PRODUCT_BYSALE,
                        payload: request
                    }
    
}


export function gtProductByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/article?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }

}

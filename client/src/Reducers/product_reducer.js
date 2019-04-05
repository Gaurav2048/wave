import { GET_PRODUCT_BYSALE,GET_PRODUCT_BY_ARRIVAL,GET_WOODS, GET_BRANDS } from "../actions/types";

export default function(state={}, action){
    switch(action.type){
        
        case GET_WOODS: 
        return {...state, woods: action.payload}

        case GET_BRANDS: 
        return {...state, brands: action.payload}

        case GET_PRODUCT_BYSALE : 
                return {...state, bySell: action.payload}
                
        case GET_PRODUCT_BY_ARRIVAL : 
                return {...state, byArrival: action.payload}        

        default:
        return state; 
    }
}
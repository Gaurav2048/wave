import { GET_PRODUCT_BYSALE,GET_PRODUCT_BY_ARRIVAL } from "../actions/types";

export default function(state={}, action){
    switch(action.type){
        
        case GET_PRODUCT_BYSALE : 
                return {...state, bySell: action.payload}
                
        case GET_PRODUCT_BY_ARRIVAL : 
                return {...state, byArrival: action.payload}        

        default:
        return state; 
    }
}
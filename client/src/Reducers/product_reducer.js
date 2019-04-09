import { GET_PRODUCT_BYSALE,GET_PRODUCT_BY_ARRIVAL,GET_WOODS, GET_BRANDS, GET_PRODUCT_TO_SHOP,ADD_PRODUCT,CLEAR_PRODUCT, ADD_BRAND } from "../actions/types";

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
        
        case ADD_BRAND: 
                return {...state,addBrand: action.payload.success, brands: action.payload.brands}        
                
        case ADD_PRODUCT : 
                return {...state, product: action.payload}       
                
        case CLEAR_PRODUCT: 
        return {...state, product:action.payload}        

        case GET_PRODUCT_TO_SHOP: 
        return { ...state   , toShop: action.payload.articles, toShopSize: action.payload.size}
        default:
        return state; 
    }
}
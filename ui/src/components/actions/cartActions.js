
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './action-types/cart-actions'

//add cart action
export const addToCart= (product)=>{
    return{
        type: ADD_TO_CART,
        product
    }
}
//remove item action
export const removeItem=(product)=>{
    return{
        type: REMOVE_ITEM,
        product
    }
}
//subtract qt action
export const subtractQuantity=(product)=>{
    return{
        type: SUB_QUANTITY,
        product
    }
}
//add qt action
export const addQuantity=(product)=>{
    return{
        type: ADD_QUANTITY,
        product
    }
}
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        // {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1},
        // {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2},
        // {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3},
        // {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4},
        // {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5},
        // {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6}
    ],
    addedItems:[],
    total: 0

};


const cartReducer = (state = initState,action)=>{

    if(action.type === ADD_TO_CART){
        let addedItem = action.product;
        let existed_item= state.addedItems.find(item=> action.product.id === item.id);
        if(existed_item)
        {
            existed_item.quantity += 1;
            return{
                ...state,
                total: state.total + existed_item.price
            }
        }
        else{
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price;

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }

        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= action.product;
        let new_items = state.addedItems.filter(item=> parseInt(action.product.id) != parseInt(item.id));

        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );
        return{
            ...state,
            addedItems: new_items,
            items: new_items,
            total: newTotal
        }
    }
    if(action.type=== ADD_QUANTITY){
        let addedItem = action.product;
        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.price;
        return{
            ...state,
            total: newTotal
        }
    }
    if(action.type=== SUB_QUANTITY){
        let addedItem = action.product;
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.product.id);
            let newTotal = state.total - addedItem.price;
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1;
            let newTotal = state.total - addedItem.price;
            return{
                ...state,
                total: newTotal
            }
        }

    }

    if(action.type=== ADD_SHIPPING){
        return{
            ...state,
            total: state.total + 6
        }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
    }

    return state
};

export default cartReducer
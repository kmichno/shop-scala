import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Navbar from "./Navbar";
import Cart from "./Cart";
import queryString from 'query-string'

class NavCart extends Component{

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
        <div>
            <Navbar loginInfo={values}/>
            <Cart/>
        </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.cartReducer.addedItems,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (product)=>{dispatch(removeItem(product))},
        addQuantity: (product)=>{dispatch(addQuantity(product))},
        subtractQuantity: (product)=>{dispatch(subtractQuantity(product))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavCart)
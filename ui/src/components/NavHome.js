import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories} from "../utils/get-api";
import {addToBasket} from "../utils/post-api";
import Navbar from "./Navbar";
import Home from "./Home";
import queryString from 'query-string'

class NavHome extends Component{

    constructor() {
        super();
        this.state = {
        };
    }

    render(){
        const values = queryString.parse(this.props.location.search);
        return(
            <div>
                <Navbar loginInfo={values}/>
                <Home/>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        // items: state.cartReducer.items
    }
}
const mapDispatchToProps= (dispatch)=>{

    return{
        addToCart: (product)=>{dispatch(addToCart(product))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavHome)
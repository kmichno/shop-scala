import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories} from "../utils/get-api";
import Navbar from "./Navbar";
import CategoryList from "./CategoryList";
import queryString from 'query-string'

class NavCategoryList extends Component{

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
                <CategoryList/>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavCategoryList)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories} from "../utils/get-api";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import queryString from 'query-string'

class NavProductList extends Component{

    constructor() {
        super();
        this.state = {
            products: [],
            categories: []
        };
    }

    componentDidMount() {
        this.setState({ loginInfo: this.props });
    }

    getCategories() {
        getCategories().then((categories) => {
            this.setState({categories});
        });
    }

    getRelatedCategoryName(categories, product) {
        for(var idx = 0; idx < categories.length; idx++)
        {
            if(categories[idx].id === product.category)
            {
                return categories[idx].name;
            }
        }
    }

    handleClick = (product, id)=>{
        this.props.addToCart(product);
    }

    render(){
        const values = queryString.parse(this.props.location.search);
        return(
            <div>
                <Navbar loginInfo={values}/>
                <ProductList/>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavProductList)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories, getProducts} from "../utils/get-api";
import {deleteProduct} from "../utils/delete-api";
import item1 from '../images/item1.jpg'
import {NavLink} from "react-router-dom";
import Popup from './Popup';

class ProductList extends Component{

    constructor() {
        super();
        this.state = {
            products: [],
            allProducts: [],
            categories: [],
            selectedOption: null,
            selectedCategory: null,
            showPopup: false,
        };
        this.handleClick = this
            .handleClick
            .bind(this)
    }

    componentDidMount() {
        this.getProducts();
        this.getCategories();
    }

    getCategories() {
        getCategories().then((categories) => {
            this.setState({categories});
        });
    }

    getProducts() {
        getProducts().then((products) => {
            this.setState({products: products, allProducts: products.copyWithin()});
        });
    }

    getRelatedCategoryName(product) {
        for(var idx = 0; idx < this.state.categories.length; idx++)
        {
            if(this.state.categories[idx].id === product.category)
            {
                return this.state.categories[idx].name;
            }
        }
    }

    handleClick = (id)=>{
        deleteProduct(id);
        let actualProducts = this.state.products.filter(product => product.id != id);
        this.setState({products: actualProducts})
        this.togglePopup();
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render(){

        let products = this.state.products;
        const {categories} = this.state;
        const {selectedCategory} = this.state;
        console.log("Produckty")
        console.log(products)

        let itemList = products.map(item=>{
            return(
                <div className="product admin" key={item.id}>
                    <div className="product-image">
                        <img src={item1} alt={item.name}/>
                    </div>

                    <div className="product-content">
                        <span className="product-title">{item.name}</span>
                        <p className="category-name">{this.getRelatedCategoryName(item)}</p>
                        <p>{item.description}</p>
                        <p><b>Cena: {item.price} zl</b></p>
                        <div>
                            <NavLink className="button button-left" to={`/product/edit/${item.id}`}>Edytuj produkt</NavLink>
                            <span className="button button-right" onClick={()=>{this.handleClick(item.id)}}>Usuń produkt</span>
                        </div>
                    </div>
                </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Przedmioty</h3>
                <div className="products admin">
                    {itemList}
                    {this.state.showPopup ?
                        <Popup
                            text='Produkt zostął usunięty'
                            url='/product/list'
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            </div>
        )
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
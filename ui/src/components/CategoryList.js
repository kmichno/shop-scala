import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories, getProducts} from "../utils/get-api";
import {deleteCategory} from "../utils/delete-api";
import item1 from '../images/item1.jpg'
import {NavLink} from "react-router-dom";
import Popup from './Popup';

class ProductList extends Component{

    constructor() {
        super();
        this.state = {
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
        this.getCategories();
    }

    getCategories() {
        getCategories().then((categories) => {
            this.setState({categories});
        });
    }

    handleClick = (id)=>{
        deleteCategory(id);
        let actualCategories = this.state.categories.filter(category => category.id != id);
        this.setState({categories: actualCategories})
        this.togglePopup();
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render(){

        const {categories} = this.state;

        let itemList = categories.map(item=>{
            return(
                <div className="product admin" key={item.id}>
                    <div className="product-content all-width">
                        <span className="product-title">Id kategorii: {item.id}</span>
                        <p>Nazwa kategorii: {item.name}</p>
                        <div>
                            <NavLink className="button button-left" to={`/category/edit/${item.id}`}>Edytuj kategorie</NavLink>
                            <span className="button button-right" onClick={()=>{this.handleClick(item.id)}}>Usuń kategorie</span>
                        </div>
                    </div>
                </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Kategorie</h3>
                <div className="products admin">
                    {itemList}
                    {this.state.showPopup ?
                        <Popup
                            text='Kategoria zostąła usunięta'
                            url='/category/list'
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
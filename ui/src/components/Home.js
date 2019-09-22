import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {getCategories, getProducts} from "../utils/get-api";
import item1 from '../images/item1.jpg'
import Popup from "./Popup";

class Home extends Component{

    setCategory = (selectedCategory) => {
        const {products} = this.state;
        const {allProducts} = this.state;
        this.setState({ selectedCategory : selectedCategory });

        let productsToState = allProducts.filter(product => parseInt(product.category) == parseInt(selectedCategory));
        this.setState({products : productsToState})
    };

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

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
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

    handleClick = (product, id)=>{

        this.props.addToCart(product);
        // addToBasket(id)
        var storedProducts = JSON.parse(sessionStorage.getItem("products"));
        if (storedProducts == null) {
            storedProducts = []
        }
        storedProducts.push(product)
        sessionStorage.setItem("products", JSON.stringify(storedProducts))
        this.togglePopup();
    }

    render(){

        let products = this.state.products;
        const {categories} = this.state;
        const {selectedCategory} = this.state;
        console.log("Produckty")
        console.log(products)

        let itemList = products.map(item=>{
            return(
                <div className="product" key={item.id}>
                    <div className="product-image">
                        <img src={item1} alt={item.name}/>
                    </div>

                    <div className="product-content">
                        <span className="product-title">{item.name}</span>
                        <p className="category-name">{this.getRelatedCategoryName(item)}</p>
                        <p>{item.description}</p>
                        <p><b>Cena: {item.price} zl</b></p>
                        <span className="button" onClick={()=>{this.handleClick(item,item.id)}}>Dodaj do koszyka</span>
                        <div className="clear"></div>
                    </div>
                </div>

            )
        })

        let categoryList = categories.map(item=>{
            return(
                <div className="category" key={item.id}>
                    <span className={item.id===selectedCategory ? 'card-title selected' : 'card-title'} onClick={()=>{this.setCategory(item.id)}}>{item.name}</span>
                </div>

            )
        })

        let options2 = [{}];
        categories.forEach(category =>
            options2.push({id: category.id, label: category.name, value: category.name})
        );

        const { selectedOption } = this.state;

        return(
            <div className="container">
                <h3 className="center">Przedmioty</h3>
                <div className="categories">
                    <b>Kategorie:</b>
                    {categoryList}
                </div>
                <div className="products">
                    {itemList}
                    {this.state.showPopup ?
                        <Popup
                            text='Przedmiot został dodany do koszyka'
                            url='/'
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

export default connect(mapStateToProps,mapDispatchToProps)(Home)
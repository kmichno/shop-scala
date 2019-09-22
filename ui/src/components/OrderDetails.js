import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getOrder, getOrdersByUserId, getOrderedProducts, getProduct} from "../utils/get-api";
import item1 from "../images/item1.jpg";
import {deleteOrder} from "../utils/delete-api";
import Popup from "./Popup";

class OrderDetails extends Component{

    constructor(props, context) {
        super(props, context);
        console.dir(props);
        this.state = {
            order: "",
            products: [],
            address: '',
            address_added: false,
            personal_receipt: false,
            id: this.props.order_id,
            showPopup: false,
            isAdmin: this.props.admin
        };
        this.handleAddressChange = this
            .handleAddressChange
            .bind(this);
        this.postData = this
            .postData
            .bind(this);
    }

    getOrder(id) {
        getOrder(id).then((order) => {
            this.setState({order});
        });
    }

    getOrderedProducts(order_id) {
        getOrderedProducts(order_id).then((products) => {
            products.forEach(product => this.getProduct(product.product_id, product.quantity))
        });
    }

    componentDidMount() {
        const {id} = this.state;
        const {products} = this.state;
        const {order} = this.state;
        this.getOrder(id)
        this.getOrderedProducts(id)

        this.setState({products});
    }

    componentWillReceiveProps(props) {
        this.setState({isAdmin: props.admin})
    }

    handleAddressChange = (e) => {
        this.setState({address: e.target.value});
    }

    postData = (event) => {
        event.preventDefault();
        this.setState({address_added: false});
        // TODO zrobic metode dodajaca adres zamowienia
        // addCategory(this.state.category_name);
        this.setState({address_added: true});
    }

    deleteOrder = (order_id) => {
        deleteOrder(order_id)
        this.togglePopup()
    }

    getProduct(product_id, quantity) {
        getProduct(product_id).then((product) => {
            let products = this.state.products;
            products.push({prod: product, quantity: quantity})
            this.setState({products: products})
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render(){
        const {order} = this.state;
        const {products} = this.state;
        console.log(this.state.products)
        let itemList = this.state.products.map(item => {
            return(
                <div className="product admin" key={item.id}>
                    <div className="product-image">
                        <img src={item1} alt={item.prod.name}/>
                    </div>

                    <div className="product-content admin">
                        <span className="product-title">{item.prod.name}</span>
                        <p>{item.prod.description}</p>
                        <p><b>Cena: {item.prod.price*item.quantity} zl</b> ( za {item.quantity} sztuk )</p>
                    </div>
                </div>

            )
        });
        console.log(itemList);
        return(
            <div>
                <div className="container margin-top">
                    <div className="order" key={order.id}>
                        <span className="product-title">Numer zamówienia: {order.id}</span>
                        <p>Adres zamowienia: {order.address}</p>
                        <div>
                            {itemList}
                        </div>
                        <p><b>Wartość zamówienia: <span className="green-c size-20">{this.state.order.amount} zl</span></b></p>
                        <span className="button margin-top-5" onClick={()=>{this.deleteOrder(order.id)}}>Anuluj zamówienie</span>
                        {this.state.showPopup ?
                            <Popup
                                text='Zamówienie zostało anulowane'
                                url={'/order/'+this.state.isAdmin}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.cartReducer.addedItems,
        total: state.cartReducer.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetails)
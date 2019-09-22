import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import {addOrder, addOrderedProducts} from "../utils/post-api";
import Popup from "./Popup";

class OrderProducts extends Component{

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            order: null,
            items: this.props.items,
            address: "",
            showPopup: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    test(event){
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
        this.submitOrder()
    }

    submitOrder = (event) => {
        event.preventDefault()
        // const {order} = this.state;
        this.addOrder()
        this.togglePopup()
    }

    addOrder() {
        var sum = 0;
        this.state.items.forEach(product => sum = sum + product.price*product.quantity)
        addOrder(global.idUser,this.state.address, sum).then((order) => {
            console.log("dsfasdfasfasdfsaf")
            console.log(this.state.items)
            console.log(order)
            this.state.items.map(product => {
                addOrderedProducts(order.id, product.id, product.quantity)
            })
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){

        return(
            <div className="container">
                <div className="cart">
                    < form onSubmit={this.submitOrder}>
                        <div className="center">
                            <br/>
                            <label htmlFor="address">Adres:</label>
                            <input id="address"
                                   required={false}
                                   name="address" type="text"
                                   placeholder="Wpisz adres"
                                   onChange={(e) => this.handleChange(e)}/>

                            <input type="submit" className="waves-effect waves-light btn" value="Złóż zamówienie"/>
                            {this.state.showPopup ?
                                <Popup
                                    text='Zamówienie zostało złożone'
                                    url='/order/user'
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
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
export default connect(mapStateToProps,mapDispatchToProps)(OrderProducts)
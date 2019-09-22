import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import {addOrder, addOrderedProducts} from "../utils/post-api";

class EditOrder extends Component{

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            order: null,
            items: this.props.items,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);

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
        this.addOrder("1")
    }

    addOrder() {
        addOrder("1","sf","sf","sdf", "dfs").then((order) => {
            console.log("dsfasdfasfasdfsaf")
            console.log(this.state.items)
            console.log(order)
            this.state.items.map(product => {
                addOrderedProducts(order.id, product.id, product.quantity)
            })
        });
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
                                   name="Address" type="text"
                                   placeholder="Wpisz adres"
                                   onChange={this.test}/>

                            <input type="submit" className="waves-effect waves-light btn" value="Złóż zamówienie"/>
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
export default connect(mapStateToProps,mapDispatchToProps)(EditOrder)
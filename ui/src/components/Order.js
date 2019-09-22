import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteOrder} from "../utils/delete-api";
import {getOrdersByUserId, getOrders} from "../utils/get-api";

class Order extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: [],
            isAdmin: this.props.admin
        };
    }

    getOrdersByUserId(user_id) {
        getOrdersByUserId(user_id).then((orders) => {
            this.setState({orders: orders});
        });
    }

    getOrders() {
        getOrders().then((orders) => {
            this.setState({orders: orders});
        });
    }

    getProperOrders(admin) {
        if (admin == "user") {
            this.getOrdersByUserId(global.idUser)
        } else {
            this.getOrders()
        }
    }

    componentWillReceiveProps(props) {
        this.getProperOrders(props.admin)
        this.setState({isAdmin: props.admin})
    }

    componentDidMount() {
        this.getProperOrders(this.props.admin)
    }

    deleteOrder = (order_id) => {
        deleteOrder(order_id)
        let actualOrders = this.state.orders.filter(order => order.id != order_id);
        this.setState({orders: actualOrders})
    }

    render(){
        const {orders} = this.state;
console.log("sfasfdsf")
console.log(this.state.orders)
        let itemList = orders.map(item=>{
            return(
                <div className="order" key={item.id}>
                        <span className="product-title">Numer zamówienia: {item.id}</span>
                        <p>Adres zamowienia: {item.address}</p>
                        <p><b>Wartość zamówienia: {item.amount} zl</b></p>
                    <Link to={`/orderDetails/${item.id}/${this.state.isAdmin}`}><span className="button">Szczegóły</span></Link>
                        <span className="button margin-top-5 red" onClick={()=>{this.deleteOrder(item.id)}}>Anuluj</span>
                </div>

            )
        })

        return (
            <div className="container margin-top">
                <div>
                    {itemList}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return{
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order)
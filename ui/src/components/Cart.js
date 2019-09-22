import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Recipe from './Recipe'
import item1 from '../images/item1.jpg'

class Cart extends Component{

    constructor(props) {
        super(props);
        console.log("PROPS")
        console.log(props)
        this.state = {
            items: this.props.items,
        };
    }

    handleRemove = (product)=>{
        this.props.removeItem(product);
        this.setState({items: this.props.items})
        console.log("remove item")
        console.log(this.props.items)
        console.log(this.props)
    }
    //to add the quantity
    handleAddQuantity = (product)=>{
        this.props.addQuantity(product);
        this.setState({items: this.props.items})
    }
    //to substruct from the quantity
    handleSubtractQuantity = (product)=>{
        this.props.subtractQuantity(product);
        this.setState({items: this.props.items})
    }
    render(){

        let addedItems = this.state.items.length ?
            (
                this.state.items.map(item=>{
                    return(
                        <div className="product" key={item.id}>
                            <div className="product-image">
                                <img src={item1} alt={item.name}/>
                            </div>

                            <div className="product-content">
                                <span className="product-title">{item.name}</span>
                                <p>{item.description}</p>
                                <p><b>Cena: {item.price} zl</b></p>
                            </div>
                            <div className="product-actions">
                                <p>
                                    <b>Ilość: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><button className="button margin-top-5" onClick={()=>{this.handleAddQuantity(item)}}>Zwiększ ilość</button></Link>
                                    <Link to="/cart"><button className="button margin-top-5" onClick={()=>{this.handleSubtractQuantity(item)}}>Zmniejsz ilość</button></Link>
                                </div>
                                <button className="button margin-top-5" onClick={()=>{this.handleRemove(item)}}>Remove</button>
                            </div>
                        </div>


                    )
                })
            ):

            (
                <p>Nic nie zostało dodane do koszyka.</p>
            )
        return(
            <div className="container">
                <div className="cart">
                    <h5>Twoje przedmioty w koszyku:</h5>
                    <ul>
                        {addedItems}
                    </ul>
                </div>
                <Recipe />
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.cartReducer.addedItems,
        // items: state.cartReducer.items,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (product)=>{dispatch(removeItem(product))},
        addQuantity: (product)=>{dispatch(addQuantity(product))},
        subtractQuantity: (product)=>{dispatch(subtractQuantity(product))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
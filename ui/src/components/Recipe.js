import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Recipe extends Component{

    render(){
        if(this.props.total > 0) {


            return (
                <div className="container">
                    <div>
                        <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                    </div>
                    {global.isLogged ?
                        <div className="checkout">
                            <Link to="/orderProducts">
                                <button className="waves-effect waves-light btn">Zamów przedmioty</button>
                            </Link>
                        </div>
                        : ""
                    }
                </div>
            )
        } else {
            return (
                <div >
                </div>
            )
        }
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

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import OrderDetails from "./OrderDetails";
import queryString from 'query-string'

class NavOrderDetails extends Component{

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                <OrderDetails order_id={this.props.match.params.id} admin={this.props.match.params.admin}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(NavOrderDetails)
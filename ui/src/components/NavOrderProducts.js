import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import OrderProducts from "./OrderProducts";
import queryString from 'query-string'

class NavOrderProducts extends Component{

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                <OrderProducts/>
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
export default connect(mapStateToProps,mapDispatchToProps)(NavOrderProducts)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import queryString from 'query-string'
import AddProduct from "./AddProduct";

class NavAddProduct extends Component{

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                <AddProduct/>
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
export default connect(mapStateToProps,mapDispatchToProps)(NavAddProduct)
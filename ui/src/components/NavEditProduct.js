import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import queryString from 'query-string'
import EditProduct from "./EditProduct";

class NavEditProduct extends Component{

    constructor(props, context) {
        super(props, context);
        console.log(this.props)
        this.state = {
            categories: [],
        };
    }

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                <EditProduct product_id={this.props.match.params.id}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(NavEditProduct)
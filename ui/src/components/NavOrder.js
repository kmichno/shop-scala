import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import queryString from 'query-string'
import Order from "./Order";

class NavOrder extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            categories: [],
        };
    }

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                <Order admin={this.props.match.params.admin}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(NavOrder)
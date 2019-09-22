import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from "./Navbar";
import queryString from 'query-string'
// import AddCategory from "./AddCategory";

class NavAddCategory extends Component{

    render(){
        let values = queryString.parse(this.props.location.search)

        return (
            <div>
                <Navbar loginInfo={values}/>
                {/*<AddCategory/>*/}
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
export default connect(mapStateToProps,mapDispatchToProps)(NavAddCategory)
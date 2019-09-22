import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {browserHistory, Router} from "react-router";
import NavCart from "./components/NavCart";
import NavHome from "./components/NavHome";
import NavAddProduct from "./components/NavAddProduct";
import NavProductList from "./components/NavProductList";
import NavAddCategory from "./components/NavAddCategory";
import NavEditProduct from "./components/NavEditProduct";
import NavOrder from "./components/NavOrder";
import NavOrderDetails from "./components/NavOrderDetails";
import NavOrderProducts from "./components/NavOrderProducts";

class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    {/*<Navbar loginInfo={loginInfoData}/>*/}
                        {/*<Router history={browserHistory}>*/}
                            <Route exact path="/" component={NavHome}/>
                            <Route path="/cart" component={NavCart}/>
                            <Route path="/addProduct" component={NavAddProduct}/>
                            <Route path="/product/edit/:id" component={NavEditProduct}/>
                            <Route path="/product/list" component={NavProductList}/>
                            <Route path="/addCategory" component={NavAddCategory}/>
                            <Route path="/order/:admin" component={NavOrder}/>
                            <Route path="/orderProducts" component={NavOrderProducts}/>
                            <Route path="/orderDetails/:id/:admin" component={NavOrderDetails}/>
                            {/*<Route path="/products" component={NavProducts}/>*/}
                        {/*</Router>*/}
                </div>
            </BrowserRouter>

        );
    }
}

export default App;

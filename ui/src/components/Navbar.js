import { Link } from 'react-router-dom'
import {LoginMaterialize} from "./LoginMaterialize";
import React, {Component} from 'react';
import {getUser, getUserIdentity} from "../utils/get-api";

export const ADMIN_EMAIL = 'kamyk43@poczta.onet.pl';

class Navbar extends Component {


    constructor() {
        super()
        this.state = {
            user: "",
            isLogged: false,
        };
    }

    componentDidMount() {
        this.getUser()
    }

    getUser() {
        getUserIdentity().then((userIdentity) => {
                this.setState({user: userIdentity});
                if (userIdentity != null && userIdentity.firstName != null) {
                    this.setState({isLogged: true});
                    global.isLogged = true;
                    getUser(userIdentity.loginInfo.providerKey).then((user) => {
                        global.idUser = user.id;
                        console.log("USER ID")
                        console.log(global.idUser)
                    });

                } else {
                    this.setState({isLogged: false});
                    global.isLogged = false;
                }
                console.log("USER")
                console.log(userIdentity)

        });
    }

    render() {
    return(
        <nav className="nav-center" role="navigation">

        <div className="nav-wrapper">
            <div className="container">
                <ul className="left hide-on-med-and-down">
                    <li><Link to="/">Sklep</Link></li>
                    <li><Link to="/cart">Koszyk</Link></li>
                    {this.state.isLogged ?
                        <li><Link to="/order/user">Moje zamówienia</Link></li>
                        : null
                    }
                    {this.state.isLogged && this.state.user.email === ADMIN_EMAIL ?
                        <span>
                            <li><Link to="/addProduct">Dodaj produkt</Link></li>
                            <li><Link to="/product/list">Lista produktów</Link></li>
                            <li><Link to="/order/admin">Lista zamówień</Link></li>
                            <li><Link to="/addCategory">Dodaj kategorie</Link></li>
                            <li><Link to="/category/list">Lista kategorii</Link></li>
                        </span>
                        : null
                    }
                </ul>
                <ul className="right">


                    <LoginMaterialize
                        firstName={this.state.user.firstName}
                        lastName={this.state.user.lastName}
                       avatarUrl=
                           {this.props.loginInfo.avatarUrl + "&height=" + this.props.loginInfo.height + "&width=" + this.props.loginInfo.width + "&ext=" + this.props.loginInfo.ext + "&hash=" + this.props.loginInfo.hash}
                    />
                </ul>
            </div>
        </div>
        </nav>


    )
}

}
export default Navbar;

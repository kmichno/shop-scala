import React, {Component} from 'react';
import "../style/style.css";
import {signOut} from "../utils/get-api";
import {Redirect} from 'react-router-dom';

const facebookLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png";
const googleLogoUrl = "https://www.ispro.pl/wp-content/uploads/2014/01/google+logo.png";

class LoginMaterialize extends Component {

    constructor(props){
        super(props);
        this.state = {
            result : [],
            finishSignOut: false,
        }

        this.signOut = this
            .signOut
            .bind(this)
    }

    signOut() {
        signOut().then((data) => {
            console.log("SIGNOUT")
            console.log(data)
            this.setState({finishSignOut: true})
        });
    }

    render() {
        if(this.state.finishSignOut) {
            return <Redirect to={{pathname: "/"}}/>
        }
        if (!this.props.firstName) {
            return (
                <ul>
                    <li><a href="http://localhost:9000/authenticate/facebook" ><img src={facebookLogoUrl} height="30"
                                                                alt="facebook"/></a></li>
                    <li><a href="http://localhost:9000/authenticate/google"><img src={googleLogoUrl} height="30"
                                                                                 alt="google"/></a></li>
                </ul>

            );
        } else {
            return (
                <ul>
                    <li>
                        <p className="center-align"><a>
                            <h6>{this.props.firstName} {this.props.lastName} </h6>
                        </a></p>
                    </li>
                    <li>
                        <a onClick={this.signOut}>Wyloguj</a>
                    </li>
                </ul>
            );
        }
    }
};
export {LoginMaterialize}
import React, {Component} from 'react';
import {editProduct} from '../utils/put-api';
import {getCategories, getProduct} from '../utils/get-api';

class EditProduct extends Component {

    constructor(props, context) {
        super(props, context);
console.log(this.props)
        this.state = {
            categories: [],
            product_id: this.props.product_id,
            product_name: '',
            product_description: '',
            product_category: '',
            product_price: '',
            product_added: false
        };

        this.postData = this
            .postData
            .bind(this);
    }

    renderOption = (json) => {
        return <option value={json.id} selected={ this.state.product_category == json.id ? "selected" : "" }>{json.name}</option>
    }

    postData = (event) => {
        event.preventDefault();
        this.setState({product_added: false});
        editProduct(this.state.product_id, this.state.product_name, this.state.product_description, this.state.product_category, this.state.product_price);
        this.setState({product_added: true});
    }

    getCategories() {
        getCategories().then((categories) => {
            this.setState({categories});
        })
    }

    getProduct() {
        getProduct(this.state.product_id).then((product) => {
            console.log("fdsfsdf")
            console.log(product)
            this.setState({product_name: product.name, product_description: product.description, product_category: product.category, product_price: product.price});
        })
    }

    componentDidMount() {
        this.getProduct();
        this.getCategories();
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (!this.state.product_added) {
            const catConst = this.state.categories;
            return (
                <div className="container-inner">
                    <form onSubmit={this.postData}>
                        <div className="center">

                            <label htmlFor="product_name">Nazwa produktu</label>
                            <input id="product_name"
                                   required={true}
                                   name="product_name" type="text"
                                   value={this.state.product_name}
                                   placeholder="Wpisz nazwe produktu"
                                   onChange={(e) => this.handleChange(e)}/>

                            <label htmlFor="product_description">Opis produktu</label>
                            <input id="product_description"
                                   required={true}
                                   name="product_description" type="text"
                                   value={this.state.product_description}
                                   placeholder="Wpisz opis produktu"
                                   onChange={(e) => this.handleChange(e)}/>


                            <label htmlFor="formControlsSelect">Kategoria produktu</label>
                            <select id="formControlsSelect"
                                    required="required"
                                    className="browser-default"
                                    placeholder="Wybierz kategorie"
                                    name="product_category"
                                    defaultValue="2"
                                    value={this.state.value}
                                    onChange={(e) => this.handleChange(e)}>
                                <option value={this.state.product_category} disabled hidden>Wybierz kategorie</option>
                                {catConst.map(this.renderOption)} </select>

                            <label htmlFor="product_price">Cena</label>
                            <input id="product_price"
                                   required={true}
                                   value={this.state.product_price}
                                   name="product_price" type="number"
                                   placeholder="Wprowadz cene"
                                   onChange={(e) => this.handleChange(e)}/>

                            <button>Edytuj produkt</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container-inner">
                    <h1>
                        Produkt <b><i>{this.state.product_name}</i></b> został zmieniony!
                    </h1>
                </div>
            );
        }
    }
}

export default EditProduct;
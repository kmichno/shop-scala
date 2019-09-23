import React, {Component} from 'react';
import {addProduct} from '../utils/post-api';
import {getCategories} from '../utils/get-api';

class AddProduct extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            categories: [],
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
        return <option value={json.id}>{json.name}</option>
    }

    postData = (event) => {
        event.preventDefault();
        this.setState({product_added: false});
        addProduct(this.state.product_name, this.state.product_description, this.state.product_category, this.state.product_price);
        this.setState({product_added: true});
    }

    getCategories() {
        getCategories().then((categories) => {
            this.setState({categories});
        })
    }

    componentDidMount() {
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
                                   placeholder="Wpisz nazwe produktu"
                                   onChange={(e) => this.handleChange(e)}/>

                            <label htmlFor="product_description">Opis produktu</label>
                            <input id="product_description"
                                   required={true}
                                   name="product_description" type="text"
                                   placeholder="Wpisz opis produktu"
                                   onChange={(e) => this.handleChange(e)}/>


                            <label htmlFor="formControlsSelect">Kategoria produktu</label>
                            <select id="formControlsSelect"
                                    required="required"
                                    className="browser-default"
                                    placeholder="Wybierz kategorie"
                                    name="product_category"
                                    value={this.state.value}
                                    onChange={(e) => this.handleChange(e)}>
                                <option value="" selected disabled hidden>Wybierz kategorie</option>
                                {catConst.map(this.renderOption)} </select>

                            <label htmlFor="product_price">Cena</label>
                            <input id="product_price"
                                   required={true}
                                   name="product_price" type="number"
                                   placeholder="Wprowadz cene"
                                   onChange={(e) => this.handleChange(e)}/>

                            <button>Dodaj produkt</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container-inner">
                    <h1>
                        Produkt <b><i>{this.state.product_name}</i></b> został dodany!
                    </h1>
                </div>
            );
        }
    }
}

export default AddProduct;
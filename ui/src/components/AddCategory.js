import React, {Component} from 'react';
import {addCategory} from '../utils/post-api';

class AddCategory extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            category_name: '',
            category_added: false
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
        this.setState({category_added: false});
        addCategory(this.state.category_name);
        this.setState({category_added: true});
    }

    componentDidMount() {
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (!this.state.category_added) {
            return (
                <div className="container-inner">
                    <form onSubmit={this.postData}>
                        <div className="center">

                            <label htmlFor="category_name">Nazwa kategorii</label>
                            <input id="category_name"
                                   required={true}
                                   name="category_name" type="text"
                                   placeholder="Wpisz nazwe kategorii"
                                   onChange={(e) => this.handleChange(e)}/>

                            <button>Dodaj kategorie</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container-inner">
                    <h1>
                        Kategoria <b><i>{this.state.category_name}</i></b> została dodana!
                    </h1>
                </div>
            );
        }
    }
}

export default AddCategory;
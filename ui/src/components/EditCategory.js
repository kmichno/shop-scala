import React, {Component} from 'react';
import {editCategory} from '../utils/put-api';
import {getCategory} from "../utils/get-api";

class EditCategory extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            category_id: this.props.category_id,
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
        editCategory(this.state.category_id, this.state.category_name);
        this.setState({category_added: true});
    }

    getCategory() {
        getCategory(this.state.category_id).then((category) => {
            console.log("fdsfsdf")
            this.setState({category_name: category.name});
        })
    }

    componentDidMount() {
        this.getCategory();
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
                                   value={this.state.category_name}
                                   onChange={(e) => this.handleChange(e)}/>

                            <button>Edytuj kategorie</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container-inner">
                    <h1>
                        Kategoria <b><i>{this.state.category_name}</i></b> została zmieniona!
                    </h1>
                </div>
            );
        }
    }
}

export default EditCategory;
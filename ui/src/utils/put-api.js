import axios from "axios";

const BASE_URL = 'http://localhost:9000';
axios.defaults.withCredentials = true;

export {editProduct, editCategory, updateUser};


function editProduct(product_id, product_name, product_description, product_category, product_price) {
    const url = `/api/editproduct/` + product_id;
    return axios.put(url, {
        product_name: product_name,
        product_description: product_description,
        product_category: parseInt(product_category, 10),
        product_price: parseInt(product_price)
    }).then(response => response.data);
}

function editCategory(category_id, category_name) {
    const url = `/api/editcategory/` + category_id;
    return axios.put(url, {
        category_name: category_name
    }).then(response => response.data);
}

function updateUser(user_id, user_name, user_surname, user_email) {
    const url = `${BASE_URL}/auth/updateUser/` + user_id;
    return axios.put(url, {
        user_name: user_name,
        user_surname: user_surname,
        user_email: user_email
    }).then(response => response.data);
}
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {addProduct, addCategory, addOrder, addOrderedProducts};

axios.defaults.withCredentials = true;

function addProduct(product_name, product_description, product_category, product_price) {
  const url = `/api/addproduct`;
  return axios.post(url, {
    product_name: product_name,
    product_description: product_description,
    product_category: parseInt(product_category, 10),
    product_price: parseInt(product_price)
  }).then(response => response.data);
}

function addOrder(user_id, address, amount) {
  const url = `/api/addorder`;
  return axios.post(url, {
    user_id: parseInt(user_id),
    address: address,
    amount: parseInt(amount),
  }).then(response => response.data);
}

function addCategory(category_name) {
  const url = `${BASE_URL}/api/addcategory`;
  return axios
    .post(url, {category_name: category_name})
    .then(response => response.data);
}

function addOrderedProducts(order_id, product_id, quantity) {
  const url = `/api/orderedproduct/add`;
  return axios
      .post(url, {
          order_id: order_id,
            product_id: product_id,
        quantity: quantity
          }
      )
      .then(response => response.data);
}
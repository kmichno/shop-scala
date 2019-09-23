import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {
  getProducts,
  getCategories,
  getBasket,
  getProduct,
  getOrdersByUserId,
  getOrder,
  getOrderedProducts,
  getOrders,
    getUser,
    signOut,
    getUserIdentity,
    getCategory
};

axios.defaults.withCredentials = true;


function getUserIdentity() {
    const url = `/api/user/identity`;
    return axios
        .get(url)
        .then(response => response.data);
}

function getUser(user_id) {
    const url = `/api/user/` + user_id;
    return axios
        .get(url)
        .then(response => response.data);
}

function getProduct(product_id) {
  const url = `/api/getproduct/` + product_id;
  return axios
    .get(url)
    .then(response => response.data);
}

function getProducts() {
    const url = `${BASE_URL}/api/getproducts`;
    return axios
        .get(url)
        .then(response => response.data);
}

function getOrdersByUserId(user_id) {
    const url = `/api/orders/all/` + user_id;
    return axios
        .get(url)
        .then(response => response.data);
}

function getOrders() {
    const url = `/api/orders`;
    return axios
        .get(url)
        .then(response => response.data);
}

function getOrder(order_id) {
    const url = `/api/order/` + order_id;
    return axios
        .get(url)
        .then(response => response.data);
}

function getOrderedProducts(order_id) {
    const url = `/api/orderedproduct/get/` + order_id;
    return axios
        .get(url)
        .then(response => response.data);
}

function getCategories() {
  const url = `${BASE_URL}/api/getcategories`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getCategory(category_id) {
    const url = `/api/getcategory/` + category_id;
    return axios
        .get(url)
        .then(response => response.data);
}

function getBasket() {
  const url = `${BASE_URL}/api/getbasket`;
  return axios
    .get(url)
    .then(response => response.data);
}

function signOut() {
  const url = `/api/signOut` ;
  return axios
      .get(url)
      .then(function (response ) {
        response.data
      })
}


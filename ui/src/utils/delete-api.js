import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {deleteProduct, deleteOrder, deleteCategory};

function deleteOrder(order_id) {
  const url = `/api/order/delete/` + order_id;
  return axios
      .delete(url)
      .then(response => response.data);
}

function deleteProduct(product_id) {
  const url = `/api/deleteproduct/` + product_id;
  return axios
      .delete(url)
      .then(response => response.data);
}

function deleteCategory(category_id) {
  const url = `/api/deletecategory/` + category_id;
  return axios
      .delete(url)
      .then(response => response.data);
}
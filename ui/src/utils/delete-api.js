import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {deleteProduct, deleteOrder};

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
import axios from 'axios';

export const createOrder = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/buyOrder`, {
    ...data
  });
  return res.data;
};
export const getAllOrder = async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/order-all`);
  return res.data;
};
export const getOrderUser = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/order-user/${id}`);
  return res.data;
};

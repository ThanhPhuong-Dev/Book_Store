import axios from 'axios';

export const evaluate = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/rating/evaluate`, data);
  return res.data;
};

export const loadData = async () => {
  const res = await axios.get(`http://127.0.0.1:5000/load_data`);
  return res.data;
};

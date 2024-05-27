import axios from 'axios';
// export const axios = axios.create({
//   withCredentials: true
// });
// import { axios } from './userService';
export const getAllProduct = async (limit) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/getAllBook?limit=${limit}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/create_book`, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/update_book/${id}`, { ...data });
  return res.data;
};

export const removeProduct = async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/delete_book/${id}`);
  return res.data;
};
export const removeProductAll = async (data, access_token) => {
  const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/delete-many`, {
    headers: {
      access_token: `Beare ${access_token}`
    },
    data
  });
  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/book-detail/${id}`);
  return res.data;
};

export const searchProduct = async (filter) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/search?filter=${filter}`);
  return res.data;
};

export const recommend = async (userId) => {
  const res = await axios.get(`http://127.0.0.1:5000/recommend_by_user?id=${userId}`);
  return res.data;
};

export const recommendPopular = async (idPopular) => {
  const res = await axios.get(`http://127.0.0.1:5000/recommend_by_popular?popular=${idPopular}`);
  return res.data;
};

export const itemBased = async (item) => {
  const res = await axios.post(`http://127.0.0.1:5000/recommend_by_item`, {
    item
  });
  return res.data;
};

export const contentBased = async (content) => {
  const res = await axios.post(`http://127.0.0.1:5000/recommend_by_content`, {
    content
  });
  return res.data;
};
export const mongoRecommend = async (limit, page, data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/recommend?limit=${limit}&page=${page}`,
    {
      data
    }
  );
  return res.data;
};

export const mongoItemBased = async (limit, data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/book/item-based?limit=${limit}`, {
    data
  });
  return res.data;
};
// export const typeProduct = async () => {
//   const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/type-all-product`);
//   return res.data;
// };

// ẽ

// export const pageTypeProduct = async (type, limit, page) => {
//   const res = await axios.get(
//     `${
//       import.meta.env.VITE_REACT_APP_API_URL_BACKEND
//     }/product/page-type-product?filter=type&filter=${type}&limit=${limit}&page=${page}`
//   );
//   return res.data;
// };
// export const pageTypeProduct = async (type) => {
//   if (type) {
//     const res = await axios.get(
//       `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct?filter=type&filter=${type}`
//     );
//     return res.data;
//   }
// };

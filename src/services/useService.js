import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/login`, data);
  return res.data;
};
export const registerUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/sign-up`, { ...data });
  return res.data;
};

export const getDetailrUser = async (id, access_token) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/getUserDetail/${id}`, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};

export const getUserAll = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/getUserAll`, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};
// export const refreshToken = async () => {
//   const res = await axiosJWT.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/refresh-token`, {
//     withCredentials: true
//   });
//   return res.data;
// };

export const refreshToken = async (refreshToken) => {
  const res = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/refresh-token`,
    {},
    {
      headers: {
        token: `Bearer ${refreshToken}`
      }
    }
  );
  return res.data;
};

export const logOutUser = async () => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/log-out`, {
    withCredentials: true
  });
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/update/${id}`, { ...data });
  return res.data;
};

export const deleteUser = async (id, access_token) => {
  const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/delete/${id}`, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};
export const loadCoinUser = async (id, access_token, data) => {
  const res = await axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/load-coin/${id}`,
    { ...data },
    {
      headers: {
        access_token: `Beare ${access_token}`
      }
    }
  );
  return res.data;
};

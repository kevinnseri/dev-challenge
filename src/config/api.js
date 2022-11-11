import axios from 'axios';

export const fetchAPI = async (dir, params) => {
  const url = `${process.env.REACT_APP_API_URL}/${dir}`;
  return axios.get(url, { params });
};

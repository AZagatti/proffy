import axios from 'axios';

const platforms = {
  web: 'http://localhost:3333',
  mobile: 'http://192.168.0.103:3333',
};

const api = (platform: 'web' | 'mobile') => {
  const url = platforms[platform];
  return axios.create({
    baseURL: url,
  });
};

export default api;

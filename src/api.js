import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'f9f8d231a4ae3a7cf18f7b54467801d1',
    language: 'en-US',
  },
});

api.get("tv/popular");

export default api;
import axios from 'axios';

const API_instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export default API_instance;
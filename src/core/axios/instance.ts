import axios from 'axios';
import {SERVER_ADDRESS} from '../../config/STATIC.json'

const API_instance = axios.create({
  baseURL: SERVER_ADDRESS,
  timeout: 5000,
});

export default API_instance;

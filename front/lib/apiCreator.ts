import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 180000;
axios.defaults.withCredentials = true;

export default axios;

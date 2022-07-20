import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://131.181.190.87:3000/.'
});
export default instance;
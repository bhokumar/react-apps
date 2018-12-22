import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5c763.firebaseio.com/'
});

export default instance;
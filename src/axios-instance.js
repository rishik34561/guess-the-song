import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gritty-beats.herokuapp.com'
});

export default instance;

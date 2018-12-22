import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Default Configuration for axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//axios.defaults.headers.common['Authorization'] = 'Auth Token';
//axios.defaults.headers.post['Content-Type'] = 'application/json';

var myIntercepter = axios.interceptors.request.use(request =>{
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

//way to eject intercepter 
axios.interceptors.request.eject(myIntercepter);

axios.interceptors.response.use(
    response =>{
        console.log(response);
        return response;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultsReducer
}); 

const store = createStore(rootReducer);

const app = (
    <Provider store = {store}>
        <App/>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

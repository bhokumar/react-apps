import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultsReducer
}); 

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching : ', action);
            const result = next(action);
            console.log('[Middleware] next state : ', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
    <Provider store = {store}>
        <App/>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const middlewares = applyMiddleware(thunk,logger);

const store = createStore(rootReducer,composeEnhancers(middlewares));

export default store;

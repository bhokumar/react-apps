import {combineReducers} from 'redux';
import moduleReducer from './reducers/moduleReducer';

const rootReducer = combineReducers({
    modules : moduleReducer
});

export default rootReducer;
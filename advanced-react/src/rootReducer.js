import {combineReducers} from 'redux';
import articleReducer from './components/reducers/articleReducer';

const rootReducer = combineReducers({
  articles : articleReducer
});

export default rootReducer;

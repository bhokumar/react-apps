import * as actionTypes from '../actions/actionsType';
import { updatedObject } from '../utility';

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.payload);
    return updatedObject(state, {results: updatedArray});
}

const initialState = {
    results: []
}

const resultsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.STORE_RESULT:
            return updatedObject(state, {results: state.results.concat({id: new Date(),value: action.payload})})
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default: 
            return state;
    }
}

export default resultsReducer;
import * as actionTypes from './actionsType';

 export const saveResult = ( payload ) => {
    return {
        type: actionTypes.STORE_RESULT,
        payload: payload
    }
 }

 export const storeResult = (payload) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            const oldCounter = getState().counter.counter;
            console.log(oldCounter);
            dispatch(saveResult(payload))
        },1000);
    } 
 }


 export const deleteResult = (payload) => {
    return {
        type: actionTypes.DELETE_RESULT,
        payload:payload
    } 
 }

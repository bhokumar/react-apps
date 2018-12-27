import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            id,
            orderData
        }
    }
}

export const puchaseBurgerfail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData).then(response => {
            console.log('Response from orders', response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        }).catch(error => {
            dispatch(puchaseBurgerfail(error));
        })
    }
}
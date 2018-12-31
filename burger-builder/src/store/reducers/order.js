import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const purchaseOrderSuccess = (state, action) => {
    const updatedOrder = updateObject(action.payload.orderData, {
        id: action.payload.id,
        purchased: true
    });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(updatedOrder)
    });
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false});
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true});
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false});
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true});
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { 
        orders: action.payload,
        loading: false
    });
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, { 
        error: action.payload,
        loading: false
    });
}

const orderReducer = (state = initialState, action) => {
    switch( action.type) {
        case ( actionTypes.PURCHASE_BURGER_SUCCESS ): return purchaseOrderSuccess(state, action);
        case ( actionTypes.PURCHASE_BURGER_FAIL ): return purchaseBurgerFail(state, action);
        case ( actionTypes.PURCHASE_BURGER_START ): return purchaseBurgerStart(state, action);
        case ( actionTypes.PURCHASE_INIT ): return purchaseInit(state, action);
        case ( actionTypes.FETCH_ORDERS_START): return fetchOrderStart(state, action);
        case ( actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrderSuccess(state, action);
        case ( actionTypes.FETCH_ORDERS_FAIL ): return fetchOrderFail(state, action);
        default:
            return state;
    }
}

export default orderReducer;
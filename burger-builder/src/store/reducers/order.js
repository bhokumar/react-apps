import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false,
}

const orderReducer = (state = initialState, action) => {
    switch( action.type) {
        case ( actionTypes.PURCHASE_BURGER_SUCCESS ): {
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.id
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        }
        case ( actionTypes.PURCHASE_BURGER_FAIL ): {
            return {
                ...state,
                loading: false
            }
        }
        case ( actionTypes.PURCHASE_BURGER_START ): {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state;
    }
}

export default orderReducer;
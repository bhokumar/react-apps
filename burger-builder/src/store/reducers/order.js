import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const orderReducer = (state = initialState, action) => {
    switch( action.type) {
        case ( actionTypes.PURCHASE_BURGER_SUCCESS ): {
            const updatedOrder = updateObject(action.payload.orderData, {
                id: action.payload.id,
                purchased: true
            });
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(updatedOrder)
            });
        }
        case ( actionTypes.PURCHASE_BURGER_FAIL ): {
            return updateObject(state, { loading: false});
        }
        case ( actionTypes.PURCHASE_BURGER_START ): {
            return updateObject(state, { loading: true});
        }
        case ( actionTypes.PURCHASE_INIT ): {
            return updateObject(state, { purchased: false});
        }
        case ( actionTypes.FETCH_ORDERS_START): {
            return updateObject(state, { loading: true});
        }
        case ( actionTypes.FETCH_ORDERS_SUCCESS): {
            return updateObject(state, { 
                orders: action.payload,
                loading: false
            });
        }
        case ( actionTypes.FETCH_ORDERS_FAIL ): {
            return updateObject(state, { 
                error: action.payload,
                loading: false
            });
        }
        default:
            return state;
    }
}

export default orderReducer;
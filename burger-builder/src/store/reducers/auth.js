import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.payload, 
        loading: false
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false,
        token: action.payload.idToken,
        userId: action.payload.userId
    });
}

const authLogout = (state) => {
    return updateObject(state, {userId: null, token: null});
}

const setAuthRedirectpath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.payload});
}

const authReducer = (state = initialState, action) => {
    switch ( action.type ){
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectpath(state, action);
        default:
            return state;
    }
}

export default authReducer;
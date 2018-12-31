import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: error
    }
};

export const authSuccess = (authdata) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: authdata
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    }
} 

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBtkPglcqGPOtY8H7bZYtTJEiuQM1XwizA';
        if (isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBtkPglcqGPOtY8H7bZYtTJEiuQM1XwizA';
        }
        axios.post(url, authData)
        .then(response => {
            const authData = {
                userId: response.data.localId,
                idToken: response.data.idToken
            };
            localStorage.setItem('token', authData.idToken);
            localStorage.setItem('userId', authData.userId);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(authData));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId'); 
                dispatch(authSuccess({idToken: token, userId: userId}));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}

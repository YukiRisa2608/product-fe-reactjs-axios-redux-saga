import * as AuthTypes from "../types/AuthTypes";

export const loginRequest = (payload) => ({
    type: AuthTypes.LOGIN_REQUEST,
    payload: payload,
});

// Action khi fetch data thành công
export const loginSuccess = (data) => ({
    type: AuthTypes.LOGIN_SUCCESS,
    payload: { data },
});

// Action khi fetch data thất bại
export const loginFailure = (error) => ({
    type: AuthTypes.LOGIN_FAILURE,
    payload: error,
});


// Logout
export const logoutRequest = () => ({
    type: AuthTypes.LOGOUT_REQUEST,
    payload: {},
});

// Action khi fetch data thành công
export const logoutSuccess = () => ({
    type: AuthTypes.LOGOUT_SUCCESS,
    payload: {},
});

// Action khi fetch data thất bại
export const logoutFailure = (error) => ({
    type: AuthTypes.LOGOUT_FAILURE,
    payload: error,
});


// Sign up
export const signupRequest = (payload) => ({
    type: AuthTypes.SIGNUP_REQUEST,
    payload: payload,
});

// Action khi fetch data thành công
export const signupSuccess = (data) => ({
    type: AuthTypes.SIGNUP_SUCCESS,
    payload: { data },
});

// Action khi fetch data thất bại
export const signupFailure = (error) => ({
    type: AuthTypes.SIGNUP_FAILURE,
    payload: error,
});

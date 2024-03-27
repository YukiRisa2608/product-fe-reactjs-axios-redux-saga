import * as UserTypes from "../types/UserTypes";

export const getUsersRequest = () => ({
    type: UserTypes.GET_USERS_REQUEST,
});

export const getUsersSuccess = (users) => ({
    type: UserTypes.GET_USERS_SUCCESS,
    payload: users,
});

export const getUsersFailure = (error) => ({
    type: UserTypes.GET_USERS_FAILURE,
    payload: error,
});


//delete
export const deleteUserRequest = (productId) => ({
    type: UserTypes.DELETE_USER_REQUEST,
    payload: productId,
});

export const deleteUserSuccess = (userId) => ({
    type: UserTypes.DELETE_USER_SUCCESS,
    payload: userId,
});

export const deleteUserFailure = (error) => ({
    type: UserTypes.DELETE_USER_FAILURE,
    payload: error,
});

//toggle
export const toggleUserStatusRequest = (userId) => ({
    type: UserTypes.TOGGLE_USER_STATUS_REQUEST,
    payload: userId,
});

export const toggleUserStatusSuccess = (userId) => ({
    type: UserTypes.TOGGLE_USER_STATUS_SUCCESS,
    payload: userId,
});

export const toggleUserStatusFailure = (error) => ({
    type: UserTypes.TOGGLE_USER_STATUS_FAILURE,
    payload: error,
});

//add
export const addUserRequest = (payload) => ({
    type: UserTypes.ADD_USER_REQUEST,
    payload: payload,
});

export const addUserSuccess = (payload) => ({
    type: UserTypes.ADD_USER_SUCCESS,
    payload: payload,
});

export const addUserFailure = (error) => ({
    type: UserTypes.ADD_USER_FAILURE,
    payload: error,
});
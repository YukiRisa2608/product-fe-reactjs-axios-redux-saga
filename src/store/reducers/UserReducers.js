import * as UserTypes from "../types/UserTypes";

const initialState = {
    users: [],
    loading: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserTypes.GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case UserTypes.GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        //toggle
        case UserTypes.TOGGLE_USER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UserTypes.TOGGLE_USER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case UserTypes.TOGGLE_USER_STATUS_FAILURE:
            return {
                ...state,
                loading: false
            };

        case UserTypes.ADD_USER_REQUEST:
            return {
                ...state,
                loading: true
            };

        case UserTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case UserTypes.ADD_USER_FAILURE:
            return {
                ...state,
                loading: false
            };

        case UserTypes.DELETE_USER_REQUEST:
            return { ...state, loading: true };

        case UserTypes.DELETE_USER_SUCCESS:
            return { ...state, loading: false };

        case UserTypes.DELETE_USER_FAILURE:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default usersReducer;
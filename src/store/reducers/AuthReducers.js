import { AuthKeys } from "../../utils/constant";
import storageService from "../../utils/storage.service";
import * as AuthTypes from "../types/AuthTypes";

const initialState = {
    loading: false,
    data: {},
    error: null,
    signupSuccess: false,
    redirectTo: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // login
        case AuthTypes.LOGIN_REQUEST:
            return { ...state, loading: true };
        case AuthTypes.LOGIN_SUCCESS:
            // Save info log
            let user = action.payload.data;
            storageService.set(AuthKeys.ACCESS_TOKEN, user?.accessToken);
            storageService.set(AuthKeys.LOGGED_IN, true);
            storageService.setObject(AuthKeys.CURRENT_USER, user);
            return { ...state, loading: false, data: user };
        case AuthTypes.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Handle navigation actions
        case AuthTypes.NAVIGATE_TO_ADMIN:
            return { ...state, redirectTo: '/admin/category' };
        case AuthTypes.NAVIGATE_TO_CUSTOMER:
            return { ...state, redirectTo: '/home' };

        // logout
        case AuthTypes.LOGOUT_REQUEST:
            return { ...state, loading: true };
        case AuthTypes.LOGOUT_SUCCESS:
            // Save info log
            storageService.remove(AuthKeys.ACCESS_TOKEN);
            storageService.set(AuthKeys.LOGGED_IN, false);
            storageService.remove(AuthKeys.CURRENT_USER);

            return { ...state, loading: false, data: {} };
        case AuthTypes.LOGOUT_FAILURE:
            return { ...state, loading: false, error: action.payload };


        // signup
        case AuthTypes.SIGNUP_REQUEST:
            return { ...state, loading: true };
        case AuthTypes.SIGNUP_SUCCESS:
            // Save info log
            return { ...state, loading: false, signupSuccess: true };
        case AuthTypes.SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload, signupSuccess: false };
        default:
            return state;
    }
};

export default authReducer;


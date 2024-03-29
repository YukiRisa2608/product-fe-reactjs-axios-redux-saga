import * as RoleTypes from "../types/RoleTypes";

const initialState = {
    roles: [],
    loading: false,
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case RoleTypes.GET_ROLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RoleTypes.GET_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload,
                loading: false,
            };
        case RoleTypes.GET_ROLES_FAILURE:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};

export default roleReducer;
import * as RoleTypes from "../types/RoleTypes";

export const getRolesRequest = () => ({
    type: RoleTypes.GET_ROLES_REQUEST,
});

export const getRolesSuccess = (roles) => ({
    type: RoleTypes.GET_ROLES_SUCCESS,
    payload: roles,
});

export const getRolesFailure = (error) => ({
    type: RoleTypes.GET_ROLES_FAILURE,
    payload: error,
});


import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/RoleServices';
import * as RoleActions from '../actions/RoleActions';
import * as RoleTypes from "../types/RoleTypes";

//get all
function* getAllRoleSaga() {
    try {
        const roles = yield call(api.getList);
        yield put(RoleActions.getRolesSuccess(roles));
    } catch (error) {
        yield put(RoleActions.getRolesFailure(error.message));
    }
}

//watcher saga
export default function* rolesWatcherSaga() {
    yield takeLatest(RoleTypes.GET_ROLES_REQUEST, getAllRoleSaga);
}
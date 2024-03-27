import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/UserServices';
import * as UserActions from '../actions/UserActions';
import * as UserTypes from "../types/UserTypes";

//get all
function* getAllUserSaga() {
    try {
        const users = yield call(api.getList);
        yield put(UserActions.getUsersSuccess(users));
    } catch (error) {
        yield put(UserActions.getUsersFailure(error.message));
    }
}

//delete
function* deleteUserSaga(action) {
    try {
        yield call(api.deleteUser, action.payload);
        yield put(UserActions.deleteUserSuccess(action.payload));
        yield put(UserActions.getUsersRequest());
    } catch (error) {
        yield put(UserActions.deleteUserFailure(error.message));
    }
}

//toggle
function* toggleUserStatusSaga(action) {
    try {
        const updatedUser = yield call(api.toggleUserStatus, action.payload);
        yield put(UserActions.toggleUserStatusSuccess(updatedUser.id));
        yield put(UserActions.getUsersRequest());
    } catch (error) {
        yield put(UserActions.toggleUserStatusFailure(error.message));
    }
}

//add
function* addUserSaga(action) {
    try {
        const newUser = yield call(api.addUser, action.payload);
        yield put(UserActions.addUserSuccess(newUser));
        yield put(UserActions.getUsersRequest());
    } catch (error) {
        yield put(UserActions.addUserFailure(error.message));
    }
}

//watcher saga
export default function* usersWatcherSaga() {
    yield takeLatest(UserTypes.GET_USERS_REQUEST, getAllUserSaga);
    yield takeLatest(UserTypes.DELETE_USER_REQUEST, deleteUserSaga);
    yield takeLatest(UserTypes.TOGGLE_USER_STATUS_REQUEST, toggleUserStatusSaga);
    yield takeLatest(UserTypes.ADD_USER_REQUEST, addUserSaga);
}
import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/AuthServices';
import * as AuthActions from '../actions/AuthActions';
import * as AuthTypes from "../types/AuthTypes";
import { AuthKeys } from "../../utils/constant";

//log-in
function* loginSaga(action) {
    try {
        const response = yield call(api.login, action.payload);
        yield put(AuthActions.loginSuccess(response));

        // Check the role and dispatch navigation action accordingly
        console.log(response?.role);
        const role = response?.role || [];
        if (role.includes(AuthKeys.ROLE_ADMIN)) {
            console.log("Navigate to admin");
            yield put({ type: AuthTypes.NAVIGATE_TO_ADMIN });
        } else if (role.includes(AuthKeys.ROLE_USER)) {
            console.log("Navigate to user");
            yield put({ type: AuthTypes.NAVIGATE_TO_CUSTOMER });
        }
    } catch (error) {
        yield put(AuthActions.loginFailure(error.message));
    }
}

//log-out
function* logoutSaga() {
    try {
        yield put(AuthActions.logoutSuccess());
    } catch (error) {
        yield put(AuthActions.logoutFailure(error.message));
    }
}

//sign-up
function* signupSaga(action) {
    try {
        const response = yield call(api.signup, action.payload);
        yield put(AuthActions.signupSuccess(response));
    } catch (error) {
        yield put(AuthActions.signupFailure(error.message));
    }
}

//watch 
function* watchAuthSaga() {
    yield takeEvery(AuthTypes.LOGIN_REQUEST, loginSaga);
    yield takeEvery(AuthTypes.LOGOUT_REQUEST, logoutSaga);
    yield takeEvery(AuthTypes.SIGNUP_REQUEST, signupSaga);
}

// Xuất saga chính để sử dụng trong redux store
export default watchAuthSaga;

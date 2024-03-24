import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/OrderServies';
import * as OrderActions from '../actions/OrderActions';
import * as OrderTypes from "../types/OrderTypes";

//get order
function* fetchOrderSaga(action) {
    try {
        const response = yield call(api.getOrderDetail, action.payload);
        yield put(OrderActions.getOrderSuccess(response));
    } catch (error) {
        yield put(OrderActions.getOrderFailed(error.message));
    }
}



//watcher
function* watchOrderSaga() {
    yield takeEvery(OrderTypes.GET_ORDER_DETAIL_REQUEST, fetchOrderSaga);
}

export default watchOrderSaga;

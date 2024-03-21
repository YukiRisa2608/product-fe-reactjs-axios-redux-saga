import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/CartServices';
import * as CartActions from '../actions/CartActions';
import * as CartTypes from "../types/CartTypes";

function* fetchCartItemSaga(action) {
    try {
        const response = yield call(api.getCartInfo, {});
        yield put(CartActions.getCartItemsSuccess(response));
    } catch (error) {
        yield put(CartActions.getCartItemsFailure(error.message));
    }
}


function* updateQuantitySaga(action) {
    try {
        const response = yield call(api.updateQuantity, action.payload);
        yield put(CartActions.updateQuantitySuccess(response));
        yield put(CartActions.getCartItemsRequest());
    } catch (error) {
        yield put(CartActions.updateQuantityFailure(error.message));
    }
}

function* purchase(action) {
    try {
        const response = yield call(api.purchase, {});
        yield put(CartActions.purchaseSuccess(response));
        yield put(CartActions.getCartItemsRequest());
    } catch (error) {
        yield put(CartActions.purchaseFailure(error.message));
    }
}


function* watchCartSaga() {
    yield takeEvery(CartTypes.GET_ITEM_CART_REQUEST, fetchCartItemSaga);
    yield takeEvery(CartTypes.UPDATE_QUANTITY_CART_REQUEST, updateQuantitySaga);
    yield takeEvery(CartTypes.PURCHASE_CART_REQUEST, purchase);
}

export default watchCartSaga;

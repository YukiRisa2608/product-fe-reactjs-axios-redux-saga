import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/CartServices';
import * as CartActions from '../actions/CartActions';
import * as CartTypes from "../types/CartTypes";

//get all
function* fetchCartItemSaga(action) {
    try {
        const response = yield call(api.getCartInfo, {});
        yield put(CartActions.getCartItemsSuccess(response));
    } catch (error) {
        yield put(CartActions.getCartItemsFailure(error.message));
    }
}

//delete
function* removeItemInCartSaga(action) {
    try {
        // Gọi API xóa item
        yield call(api.removeItemInCart, action.payload);
        yield put(CartActions.removeItemInCartSuccess(action.payload));
        // gọi lại danh sách items in cart
        yield put(CartActions.getCartItemsRequest());
    } catch (error) {
        yield put(CartActions.removeItemInCartFailure(error.message));
    }
}

//+- quantity
function* updateQuantitySaga(action) {
    try {
        const response = yield call(api.updateQuantity, action.payload);
        yield put(CartActions.updateQuantitySuccess(response));
        yield put(CartActions.getCartItemsRequest());
    } catch (error) {
        yield put(CartActions.updateQuantityFailure(error.message));
    }
}

//purchase
function* purchase(action) {
    try {
        const response = yield call(api.purchase, {});
        yield put(CartActions.purchaseSuccess(response));
        yield put(CartActions.getCartItemsRequest());
    } catch (error) {
        yield put(CartActions.purchaseFailure(error.message));
    }
}


// add to cart
function* addToCart(action) {
    try {
        const response = yield call(api.addToCart, action.payload);
        yield put(CartActions.addToCartSuccess(response));
    } catch (error) {
        yield put(CartActions.addToCartFailure(error.message));
    }
}

//watcher
function* watchCartSaga() {
    yield takeEvery(CartTypes.GET_ITEM_CART_REQUEST, fetchCartItemSaga);
    yield takeEvery(CartTypes.UPDATE_QUANTITY_CART_REQUEST, updateQuantitySaga);
    yield takeEvery(CartTypes.PURCHASE_CART_REQUEST, purchase);
    yield takeEvery(CartTypes.REMOVE_ITEM_CART_REQUEST, removeItemInCartSaga);
    yield takeEvery(CartTypes.ADD_TO_CART_REQUEST, addToCart);
}

export default watchCartSaga;

import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/ProductServices';
import * as ProductActions from '../actions/ProductActions';
import * as ProductTypes from "../types/ProductTypes";

//get all
function* getProductsSaga() {
    try {
        const products = yield call(api.getList);
        yield put(ProductActions.getProductsSuccess(products));
    } catch (error) {
        yield put(ProductActions.getProductsFailure(error.message));
    }
}

//delete
function* deleteProductSaga(action) {
    try {
        // Gọi API xóa product
        yield call(api.deleteProduct, action.payload);
        yield put(ProductActions.deleteProductSuccess(action.payload));
        // gọi lại danh sách products
        yield put(ProductActions.getProductsRequest());
    } catch (error) {
        yield put(ProductActions.deleteProductFailure(error.message));
    }
}

//toggle
function* toggleProductStatusSaga(action) {
    try {
        const updatedProduct = yield call(api.toggleProductStatus, action.payload);
        yield put(ProductActions.toggleProductStatusSuccess(updatedProduct.id));
        yield put(ProductActions.getProductsRequest());
    } catch (error) {
        yield put(ProductActions.toggleProductStatusFailure(error.message));
    }
}

//add
function* addProductSaga(action) {
    try {
        const newProduct = yield call(api.addProduct, action.payload);
        yield put(ProductActions.addProductSuccess(newProduct));
        //fetch lại danh sách sau khi thêm thành công
        yield put(ProductActions.getProductsRequest());
    } catch (error) {
        yield put(ProductActions.addProductFailure(error.message));
    }
}

//edit
function* editProductSaga(action) {
    try {
        const updatedProduct = yield call(api.updateProduct, action.payload.productId, action.payload);
        yield put(ProductActions.editProductSuccess(updatedProduct));
        //fetch lại danh sách sau khi cập nhật thành công
        yield put(ProductActions.getProductsRequest());
    } catch (error) {
        yield put(ProductActions.editProductFailure(error.message));
    }
}



//watcher saga
export default function* productsWatcherSaga() {
    yield takeLatest(ProductTypes.GET_PRODUCTS_REQUEST, getProductsSaga);
    yield takeLatest(ProductTypes.DELETE_PRODUCT_REQUEST, deleteProductSaga);
    yield takeLatest(ProductTypes.TOGGLE_PRODUCT_STATUS_REQUEST, toggleProductStatusSaga);
    yield takeLatest(ProductTypes.ADD_PRODUCT_REQUEST, addProductSaga);
    yield takeLatest(ProductTypes.EDIT_PRODUCT_REQUEST, editProductSaga);

}

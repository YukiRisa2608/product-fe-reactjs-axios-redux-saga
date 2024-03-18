import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/CategoryServices';
import * as categoryActions from '../actions/CategoryActions';
import * as categoryTypes from "../types/CategoryTypes";

//get all
function* getCategoriesSaga() {
    try {
        const categories = yield call(api.getList);
        yield put(categoryActions.getCategoriesSuccess(categories));
    } catch (error) {
        yield put(categoryActions.getCategoriesFailure(error.message));
    }
}

//delete
function* deleteCategorySaga(action) {
    try {
        // Gọi API xóa category
        yield call(api.deleteCategory, action.payload); 
        yield put(categoryActions.deleteCategorySuccess(action.payload));
        // gọi lại danh sách categories
        yield put(categoryActions.getCategoriesRequest());
    } catch (error) {
        yield put(categoryActions.deleteCategoryFailure(error.message));
    }
}

//toggle
function* toggleCategoryStatusSaga(action) {
    try {
        const updatedCategory = yield call(api.toggleCategoryStatus, action.payload); 
        yield put(categoryActions.toggleCategoryStatusSuccess(updatedCategory.id));
    } catch (error) {
        yield put(categoryActions.toggleCategoryStatusFailure(error.message));
    }
}


//watcher saga
export default function* categoriesWatcherSaga() {
    yield takeLatest(categoryTypes.GET_CATEGORIES_REQUEST, getCategoriesSaga);
    yield takeLatest(categoryTypes.DELETE_CATEGORY_REQUEST, deleteCategorySaga);
    yield takeLatest(categoryTypes.TOGGLE_CATEGORY_STATUS_REQUEST, toggleCategoryStatusSaga);

}

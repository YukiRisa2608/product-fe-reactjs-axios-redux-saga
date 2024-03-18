import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/CategoryServices';
import * as CategoryActions from '../actions/CategoryActions';
import * as CategoryTypes from "../types/CategoryTypes";

//get all
function* getCategoriesSaga() {
    try {
        const categories = yield call(api.getList);
        yield put(CategoryActions.getCategoriesSuccess(categories));
    } catch (error) {
        yield put(CategoryActions.getCategoriesFailure(error.message));
    }
}

//delete
function* deleteCategorySaga(action) {
    try {
        // Gọi API xóa category
        yield call(api.deleteCategory, action.payload); 
        yield put(CategoryActions.deleteCategorySuccess(action.payload));
        // gọi lại danh sách categories
        yield put(CategoryActions.getCategoriesRequest());
    } catch (error) {
        yield put(CategoryActions.deleteCategoryFailure(error.message));
    }
}

//toggle
function* toggleCategoryStatusSaga(action) {
    try {
        const updatedCategory = yield call(api.toggleCategoryStatus, action.payload); 
        yield put(CategoryActions.toggleCategoryStatusSuccess(updatedCategory.id));
        yield put(CategoryActions.getCategoriesRequest());
    } catch (error) {
        yield put(CategoryActions.toggleCategoryStatusFailure(error.message));
    }
}

//add
function* addCategorySaga(action) {
    try {
        const newCategory = yield call(api.addCategory, action.payload);
        yield put(CategoryActions.addCategorySuccess(newCategory));
        //fetch lại danh sách sau khi thêm thành công
        yield put(CategoryActions.getCategoriesRequest());
    } catch (error) {
        yield put(CategoryActions.addCategoryFailure(error.message));
    }
}

//edit
function* editCategorySaga(action) {
    try {
        const updatedCategory = yield call(api.updateCategory, action.payload.categoryId, action.payload.categoryName);
        yield put(CategoryActions.editCategorySuccess(updatedCategory));
        //fetch lại danh sách sau khi cập nhật thành công
        yield put(CategoryActions.getCategoriesRequest());
    } catch (error) {
        yield put(CategoryActions.editCategoryFailure(error.message));
    }
}



//watcher saga
export default function* categoriesWatcherSaga() {
    yield takeLatest(CategoryTypes.GET_CATEGORIES_REQUEST, getCategoriesSaga);
    yield takeLatest(CategoryTypes.DELETE_CATEGORY_REQUEST, deleteCategorySaga);
    yield takeLatest(CategoryTypes.TOGGLE_CATEGORY_STATUS_REQUEST, toggleCategoryStatusSaga);
    yield takeLatest(CategoryTypes.ADD_CATEGORY_REQUEST, addCategorySaga);
    yield takeLatest(CategoryTypes.EDIT_CATEGORY_REQUEST, editCategorySaga);

}

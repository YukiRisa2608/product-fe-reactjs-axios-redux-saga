import * as types from "../types/CategoryTypes";

// action cho saga: redux saga sẽ thực hiện hành động getListSaga khi dispatch 1 action có type GET_LIST
export const getCategoriesRequest = () => ({
    type: 'GET_CATEGORIES_REQUEST',
});

// action cho reducer: reducer sẽ thực hiện hành động cập nhật data khi dispatch 1 action có type GET_LIST_DONE
export const getCategoriesSuccess = (categories) => ({
    type: 'GET_CATEGORIES_SUCCESS',
    payload: categories,
});

export const getCategoriesFailure = (error) => ({
    type: 'GET_CATEGORIES_FAILURE',
    payload: error,
});


//delete

export const deleteCategoryRequest = (categoryId) => ({
    type: types.DELETE_CATEGORY_REQUEST,
    payload: categoryId,
});

export const deleteCategorySuccess = (categoryId) => ({
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: categoryId,
});

export const deleteCategoryFailure = (error) => ({
    type: types.DELETE_CATEGORY_FAILURE,
    payload: error,
});

//toggle
export const toggleCategoryStatusRequest = (categoryId) => ({
    type: types.TOGGLE_CATEGORY_STATUS_REQUEST,
    payload: categoryId,
});

export const toggleCategoryStatusSuccess = (categoryId) => ({
    type: types.TOGGLE_CATEGORY_STATUS_SUCCESS,
    payload: categoryId,
});

export const toggleCategoryStatusFailure = (error) => ({
    type: types.TOGGLE_CATEGORY_STATUS_FAILURE,
    payload: error,
});

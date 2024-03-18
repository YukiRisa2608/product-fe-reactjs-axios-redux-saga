import * as CategoryTypes from "../types/CategoryTypes";

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
    type: CategoryTypes.DELETE_CATEGORY_REQUEST,
    payload: categoryId,
});

export const deleteCategorySuccess = (categoryId) => ({
    type: CategoryTypes.DELETE_CATEGORY_SUCCESS,
    payload: categoryId,
});

export const deleteCategoryFailure = (error) => ({
    type: CategoryTypes.DELETE_CATEGORY_FAILURE,
    payload: error,
});

//toggle
export const toggleCategoryStatusRequest = (categoryId) => ({
    type: CategoryTypes.TOGGLE_CATEGORY_STATUS_REQUEST,
    payload: categoryId,
});

export const toggleCategoryStatusSuccess = (categoryId) => ({
    type: CategoryTypes.TOGGLE_CATEGORY_STATUS_SUCCESS,
    payload: categoryId,
});

export const toggleCategoryStatusFailure = (error) => ({
    type: CategoryTypes.TOGGLE_CATEGORY_STATUS_FAILURE,
    payload: error,
});

//add
export const addCategoryRequest = (categoryName) => ({
    type: CategoryTypes.ADD_CATEGORY_REQUEST,
    payload: categoryName,
});

export const addCategorySuccess = (category) => ({
    type: CategoryTypes.ADD_CATEGORY_SUCCESS,
    payload: category,
});

export const addCategoryFailure = (error) => ({
    type: CategoryTypes.ADD_CATEGORY_FAILURE,
    payload: error,
});

//edit
export const editCategoryRequest = (categoryId, categoryName) => ({
    type: CategoryTypes.EDIT_CATEGORY_REQUEST,
    payload: { categoryId, categoryName },
});

export const editCategorySuccess = (category) => ({
    type: CategoryTypes.EDIT_CATEGORY_SUCCESS,
    payload: category,
});

export const editCategoryFailure = (error) => ({
    type: CategoryTypes.EDIT_CATEGORY_FAILURE,
    payload: error,
});

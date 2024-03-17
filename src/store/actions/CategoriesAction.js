import * as types from "../types/CategoriesType";

// action cho saga: redux saga sẽ thực hiện hành động getLikeSaga khi dispatch 1 action có type GET_LIKE
export const actionGetListCategories = () => ({
    type: types.GET_LIST,
});

// action cho reducer: reducer sẽ thực hiện hành động cập nhật data khi dispatch 1 action có type GET_LIKE_DONE
export const actionGetListCategoriesDone = (payload) => ({
    type: types.GET_LIST_DONE,
    payload
});

export const actionCreateCategory = (payload) => ({
    type: types.CREATE, 
    payload
})

export const actionCreateCategoryDone = () => ({
    type: types.CREATE_DONE, 
})
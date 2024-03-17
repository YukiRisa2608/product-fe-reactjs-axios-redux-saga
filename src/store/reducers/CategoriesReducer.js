import * as types from "../types/CategoriesType";

const INITIAL_STATE = {
    categories: [],
};

// Replace with you own reducer
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_LIST_DONE:
            return {
                ...state,
                categories: action.categoriesData ? action.categoriesData : []
            };
        case types.CREATE:
            return state;
        case types.CREATE_DONE:
            console.log("CREATE_DONE");
            return state;
        case types.UPDATE:
            return state;
        case types.DELETE:
            return state;
        default:
            return state;
    }
};
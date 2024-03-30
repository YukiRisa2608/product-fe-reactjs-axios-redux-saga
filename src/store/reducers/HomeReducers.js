import * as HomeTypes from "../types/HomeTypes";

const initialState = {
    loading: false,
    items: [],
    categories: [],
    products: [],
    totalPages: 0,
    error: null,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeTypes.GET_HOME_ITEMS_REQUEST:
            return { ...state, loading: true };
        case HomeTypes.GET_HOME_ITEMS_SUCCESS:
            return { ...state, loading: false, items: action.payload.data, totalPages: action.payload.totalPages };
        case HomeTypes.GET_HOME_ITEMS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //sort
        case HomeTypes.GET_SORT_REQUEST:
            return { ...state, loading: true };
        case HomeTypes.GET_SORT_SUCCESS:
            return { ...state, loading: false, items: action.payload.data, totalPages: action.payload.totalPages };
        case HomeTypes.GET_SORT_FAILURE:

        case HomeTypes.GET_LIST_CATEGORIES_REQUEST:
            return { ...state, loading: true };
        case HomeTypes.GET_LIST_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case HomeTypes.GET_LIST_CATEGORIES_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case HomeTypes.SEARCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case HomeTypes.SEARCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload.data, totalPages: action.payload.pages };
        case HomeTypes.SEARCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default homeReducer;


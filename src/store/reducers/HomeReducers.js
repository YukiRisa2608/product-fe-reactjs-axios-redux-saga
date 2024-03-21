import * as HomeTypes from "../types/HomeTypes";

const initialState = {
    loading: false,
    products: [],
    totalPages: 0,
    error: null,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeTypes.GET_HOME_ITEMS_REQUEST:
            return { ...state, loading: true };
        case HomeTypes.GET_HOME_ITEMS_SUCCESS:
            return { ...state, loading: false, products: action.payload.data, totalPages: action.payload.totalPages };
        case HomeTypes.GET_HOME_ITEMS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default homeReducer;


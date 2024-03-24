import * as ProductTypes from "../types/ProductTypes";

const initialState = {
    products: [],
    loading: false,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProductTypes.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ProductTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        // delete
        case ProductTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                // Lọc ra product không bị xóa
                products: state.products.filter(product => product.id !== action.payload),
            };
        //toggle
        case ProductTypes.TOGGLE_PRODUCT_STATUS_SUCCESS:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload ? { ...product, status: !product.status } : product),
            };

        //add
        case ProductTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
            };

        case ProductTypes.ADD_PRODUCT_FAILURE:
            return {
                ...state,
            };

        //edit
        case ProductTypes.EDIT_PRODUCT_REQUEST:
            return { ...state, loading: true };

        case ProductTypes.EDIT_PRODUCT_SUCCESS:
            return { ...state, loading: false };

        case ProductTypes.EDIT_PRODUCT_FAILURE:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default productsReducer;

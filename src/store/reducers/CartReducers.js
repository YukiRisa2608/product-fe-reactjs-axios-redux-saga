import * as CartTypes from "../types/CartTypes";

const initialState = {
    loading: false,
    items: [],
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartTypes.GET_ITEM_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.GET_ITEM_CART_SUCCESS:
            return { ...state, loading: false, items: action.payload.data };
        case CartTypes.GET_ITEM_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CartTypes.UPDATE_QUANTITY_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.UPDATE_QUANTITY_CART_SUCCESS:
            return { ...state, loading: false };
        case CartTypes.UPDATE_QUANTITY_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

            
        case CartTypes.PURCHASE_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.PURCHASE_CART_SUCCESS:
            return { ...state, loading: false };
        case CartTypes.PURCHASE_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default cartReducer;


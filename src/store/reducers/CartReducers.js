import * as CartTypes from "../types/CartTypes";

const initialState = {
    loading: false,
    items: [],
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        //get all
        case CartTypes.GET_ITEM_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.GET_ITEM_CART_SUCCESS:
            return { ...state, loading: false, items: action.payload.data };
        case CartTypes.GET_ITEM_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //delete
        case CartTypes.UPDATE_QUANTITY_CART_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        //+- quantity
        case CartTypes.UPDATE_QUANTITY_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.UPDATE_QUANTITY_CART_SUCCESS:
            return { ...state, loading: false };
        case CartTypes.UPDATE_QUANTITY_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //purchase    
        case CartTypes.PURCHASE_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.PURCHASE_CART_SUCCESS:
            return { ...state, loading: false };
        case CartTypes.PURCHASE_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //purchase    
        case CartTypes.ADD_TO_CART_REQUEST:
            return { ...state, loading: true };
        case CartTypes.ADD_TO_CART_SUCCESS:
            return { ...state, loading: false };
        case CartTypes.ADD_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default cartReducer;


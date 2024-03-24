import * as OrderTypes from "../types/OrderTypes";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        //get all
        case OrderTypes.GET_ORDER_DETAIL_REQUEST:
            return { ...state, loading: true };
        case OrderTypes.GET_ORDER_DETAIL_SUCCESS:
            return { ...state, loading: false, data: action.payload.data };
        case OrderTypes.GET_ORDER_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default orderReducer;


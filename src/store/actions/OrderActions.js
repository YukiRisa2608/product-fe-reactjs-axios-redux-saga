import * as OrderTypes from "../types/OrderTypes";

// Action để trigger saga fetch data
export const getOrderRequest = (payload) => ({
    type: OrderTypes.GET_ORDER_DETAIL_REQUEST,
    payload: payload,
});

// Action khi fetch data thành công
export const getOrderSuccess = (data) => ({
    type: OrderTypes.GET_ORDER_DETAIL_SUCCESS,
    payload: { data },
});

// Action khi fetch data thất bại
export const getOrderFailed = (error) => ({
    type: OrderTypes.GET_ORDER_DETAIL_FAILURE,
    payload: error,
});


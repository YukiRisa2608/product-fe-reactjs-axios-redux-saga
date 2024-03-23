import * as CartTypes from "../types/CartTypes";

// Action để trigger saga fetch data
export const getCartItemsRequest = () => ({
    type: CartTypes.GET_ITEM_CART_REQUEST,
    payload: {},
});

// Action khi fetch data thành công
export const getCartItemsSuccess = (data) => ({
    type: CartTypes.GET_ITEM_CART_SUCCESS,
    payload: { data },
});

// Action khi fetch data thất bại
export const getCartItemsFailure = (error) => ({
    type: CartTypes.GET_ITEM_CART_FAILURE,
    payload: error,
});

//---------------delete---------------------

export const removeItemInCartRequest = (productId) => ({
    type: CartTypes.REMOVE_ITEM_CART_REQUEST,
    payload: productId,
});

export const removeItemInCartSuccess = (productId) => ({
    type: CartTypes.REMOVE_ITEM_CART_SUCCESS,
    payload: productId,
});

export const removeItemInCartFailure = (error) => ({
    type: CartTypes.REMOVE_ITEM_CART_FAILURE,
    payload: error,
});

// ---------------------- Update quantity cart --------------------
export const updateQuantityRequest = (payload) => ({
    type: CartTypes.UPDATE_QUANTITY_CART_REQUEST,
    payload: payload,
});

export const updateQuantitySuccess = (data) => ({
    type: CartTypes.UPDATE_QUANTITY_CART_SUCCESS,
    payload: { data },
});

export const updateQuantityFailure = (error) => ({
    type: CartTypes.UPDATE_QUANTITY_CART_FAILURE,
    payload: error,
});

// ---------------------- purchase cart --------------------
export const purchaseRequest = (payload) => ({
    type: CartTypes.PURCHASE_CART_REQUEST,
    payload: payload,
});

export const purchaseSuccess = (data) => ({
    type: CartTypes.PURCHASE_CART_SUCCESS,
    payload: { data },
});

export const purchaseFailure = (error) => ({
    type: CartTypes.PURCHASE_CART_FAILURE,
    payload: error,
});

// ---------------------- add to cart --------------------
export const addToCartRequest = (payload) => ({
    type: CartTypes.ADD_TO_CART_REQUEST,
    payload: payload,
});

export const addToCartSuccess = (data) => ({
    type: CartTypes.ADD_TO_CART_SUCCESS,
    payload: { data },
});

export const addToCartFailure = (error) => ({
    type: CartTypes.ADD_TO_CART_FAILURE,
    payload: error,
});
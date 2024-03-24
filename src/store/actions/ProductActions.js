import * as ProductTypes from "../types/ProductTypes";

// action cho saga: redux saga sẽ thực hiện hành động getListSaga khi dispatch 1 action có type GET_LIST
export const getProductsRequest = () => ({
    type: 'GET_PRODUCTS_REQUEST',
});

// action cho reducer: reducer sẽ thực hiện hành động cập nhật data khi dispatch 1 action có type GET_LIST_DONE
export const getProductsSuccess = (products) => ({
    type: 'GET_PRODUCTS_SUCCESS',
    payload: products,
});

export const getProductsFailure = (error) => ({
    type: 'GET_PRODUCTS_FAILURE',
    payload: error,
});


//delete

export const deleteProductRequest = (productId) => ({
    type: ProductTypes.DELETE_PRODUCT_REQUEST,
    payload: productId,
});

export const deleteProductSuccess = (productId) => ({
    type: ProductTypes.DELETE_PRODUCT_SUCCESS,
    payload: productId,
});

export const deleteProductFailure = (error) => ({
    type: ProductTypes.DELETE_PRODUCT_FAILURE,
    payload: error,
});

//toggle
export const toggleProductStatusRequest = (productId) => ({
    type: ProductTypes.TOGGLE_PRODUCT_STATUS_REQUEST,
    payload: productId,
});

export const toggleProductStatusSuccess = (productId) => ({
    type: ProductTypes.TOGGLE_PRODUCT_STATUS_SUCCESS,
    payload: productId,
});

export const toggleProductStatusFailure = (error) => ({
    type: ProductTypes.TOGGLE_PRODUCT_STATUS_FAILURE,
    payload: error,
});

//add
export const addProductRequest = (productName) => ({
    type: ProductTypes.ADD_PRODUCT_REQUEST,
    payload: productName,
});

export const addProductSuccess = (product) => ({
    type: ProductTypes.ADD_PRODUCT_SUCCESS,
    payload: product,
});

export const addProductFailure = (error) => ({
    type: ProductTypes.ADD_PRODUCT_FAILURE,
    payload: error,
});

//edit
export const editProductRequest = (productId, payload) => ({
    type: ProductTypes.EDIT_PRODUCT_REQUEST,
    payload: { productId, payload },
});

export const editProductSuccess = (product) => ({
    type: ProductTypes.EDIT_PRODUCT_SUCCESS,
    payload: product,
});

export const editProductFailure = (error) => ({
    type: ProductTypes.EDIT_PRODUCT_FAILURE,
    payload: error,
});

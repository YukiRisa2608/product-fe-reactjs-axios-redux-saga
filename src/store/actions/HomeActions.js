import * as HomeTypes from "../types/HomeTypes";


// Action để trigger saga fetch data
export const getHomeItemsRequest = (page) => ({
    type: HomeTypes.GET_HOME_ITEMS_REQUEST,
    payload: page,
});

// Action khi fetch data thành công
export const getHomeItemsSuccess = (data, totalPages) => ({
    type: HomeTypes.GET_HOME_ITEMS_SUCCESS,
    payload: { data, totalPages },
});

// Action khi fetch data thất bại
export const getHomeItemsFailure = (error) => ({
    type: HomeTypes.GET_HOME_ITEMS_FAILURE,
    payload: error,
});

//sort by price

export const getSortRequest = (page, size, sortDirection) => ({
  type: HomeTypes.GET_SORT_REQUEST,
  payload: { page, size, sortDirection },
});

export const getSortSuccess = (products) => ({
  type: HomeTypes.GET_SORT_SUCCESS,
  payload: products,
});

export const getSortFailure = (error) => ({
  type: HomeTypes.GET_SORT_FAILURE,
  payload: error,
});

// Get list category
export const getListCategoriesRequest = () => ({
  type: HomeTypes.GET_LIST_CATEGORIES_REQUEST,
  payload: {},
});

export const getListCategoriesSuccess = (data) => ({
  type: HomeTypes.GET_HOME_ITEMS_SUCCESS,
  payload: data,
});

export const getListCategoriesFailure = (error) => ({
  type: HomeTypes.GET_HOME_ITEMS_FAILURE,
  payload: error,
});

// Search product
export const searchProductsRequest = (payload) => ({
  type: HomeTypes.SEARCH_PRODUCTS_REQUEST,
  payload: payload,
});

export const searchProductsSuccess = (data) => ({
  type: HomeTypes.SEARCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const searchProductsFailure = (error) => ({
  type: HomeTypes.SEARCH_PRODUCTS_FAILURE,
  payload: error,
});
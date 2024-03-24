import { combineReducers } from "redux";
import home from "./HomeReducers";
import categories from "./CategoryReducers";
import products from "./ProductReducers";
import carts from "./CartReducers";
import authReducer from "./AuthReducers";
import orderReducer from "./OrderReducers";

export default combineReducers({
    home,
    categories,
    products,
    carts,
    authReducer,
    orderReducer
});

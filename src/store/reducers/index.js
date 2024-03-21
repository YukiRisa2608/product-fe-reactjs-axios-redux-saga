import { combineReducers } from "redux";
import home from "./HomeReducers";
import categories from "./CategoryReducers";
import products from "./ProductReducers";
import carts from "./CartReducers";

export default combineReducers({
    home,
    categories,
    products,
    carts
});

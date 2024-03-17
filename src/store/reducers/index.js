import { combineReducers } from "redux";
import home from "./HomeReducer";
import categories from "./CategoriesReducer";

export default combineReducers({
    home,
    categories
});
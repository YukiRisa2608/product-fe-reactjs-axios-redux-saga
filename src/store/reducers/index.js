import { combineReducers } from "redux";
import home from "./HomeReducers";
import categories from "./CategoryReducers";

export default combineReducers({
    home,
    categories
});

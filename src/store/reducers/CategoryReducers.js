import * as CategoryTypes from "../types/CategoryTypes";

const initialState = {
    categories: [],
    loading: false,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) { 
        case CategoryTypes.GET_CATEGORIES_REQUEST: 
            return {
                ...state,
                loading: true,
            };
        case CategoryTypes.GET_CATEGORIES_SUCCESS: 
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        // delete
        case CategoryTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                // Lọc ra category không bị xóa
                categories: state.categories.filter(category => category.id !== action.payload),
            };
        //toggle
        case CategoryTypes.TOGGLE_CATEGORY_STATUS_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category => 
                category.id === action.payload ? { ...category, status: !category.status } : category),
             };
    
        //add
        case CategoryTypes.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case CategoryTypes.ADD_CATEGORY_FAILURE:
            return {
                ...state,
            };    

        //edit
        case CategoryTypes.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category.id === action.payload.id ? { ...action.payload } : category
                ),
            };
    
        default:
            return state;
    }
};

export default categoriesReducer;

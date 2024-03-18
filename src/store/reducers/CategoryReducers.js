import * as categoryTypes from "../types/CategoryTypes";

const initialState = {
    categories: [],
    loading: false,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) { 
        case categoryTypes.GET_CATEGORIES_REQUEST: 
            return {
                ...state,
                loading: true,
            };
        case categoryTypes.GET_CATEGORIES_SUCCESS: 
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        // delete
        case categoryTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                // Lọc ra category không bị xóa
                categories: state.categories.filter(category => category.id !== action.payload),
            };
        //toggle
        case categoryTypes.TOGGLE_CATEGORY_STATUS_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category => 
                category.id === action.payload ? { ...category, status: !category.status } : category
        ),
    };
    

        default:
            return state;
    }
};

export default categoriesReducer;

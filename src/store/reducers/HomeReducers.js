import * as types from "../types/HomeTypes";

const INITIAL_STATE = {
    like: 0,
    number: 0
};

// Replace with you own reducer
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_LIKE_DONE:
            return {
                ...state,
                like: action.demoData ? action.demoData.like : 0
            };
        case types.POST_LIKE:
            return {
                ...state,
                ...action.payload
            };
        case types.INCREASE:
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREASE:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
};
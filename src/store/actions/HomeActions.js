import * as types from "../types/HomeType";

// action cho saga: redux saga sẽ thực hiện hành động getLikeSaga khi dispatch 1 action có type GET_LIKE
export const actionRequestLike = () => ({
    type: types.GET_LIKE,
});

// action cho reducer: reducer sẽ thực hiện hành động cập nhật data khi dispatch 1 action có type GET_LIKE_DONE
export const actionRequestLikeDone = (payload) => ({
    type: types.GET_LIKE_DONE,
    payload
});

export const actionIncrease = () => ({
    type: types.INCREASE
});

export const actionDecrease = () => ({
    type: types.DECREASE
});

export const actionPostLike = payload => ({
    type: types.POST_LIKE,
    payload
});
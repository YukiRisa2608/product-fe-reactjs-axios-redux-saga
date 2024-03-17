import { put, call } from 'redux-saga/effects';
import * as types from '../types/CategoriesType';
import { getList, create } from '../../api/CategoriesService';

const errorData = {};

export function* getListCategories({ payload }) {
    try {
        const categoriesData = yield call(getList, payload);

        yield put({ type: types.GET_LIST_DONE, categoriesData });
    } catch (error) {
        yield put({ type: types.GET_LIST_DONE, errorData });
    }
}

export function* createCategory({ payload }) {
    try {
        const response = yield call(create, payload);
        yield put({ type: types.CREATE_DONE, response });
    } catch (error) {
        yield put({ type: types.CREATE_DONE, errorData });
    }
}
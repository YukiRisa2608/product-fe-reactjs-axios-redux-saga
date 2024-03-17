import { all, takeLatest } from 'redux-saga/effects';
import { getLikeSaga } from './HomeSaga';
import { createCategory, getListCategories } from './CategoriesSaga';

import * as homeTypes from '../types/HomeType';
import * as categoriesTypes from '../types/CategoriesType';

export default function* rootSaga() {
    yield all([
        takeLatest(homeTypes.GET_LIKE, getLikeSaga),
        takeLatest(categoriesTypes.GET_LIST, getListCategories),
        takeLatest(categoriesTypes.CREATE, createCategory),
    ]);
}
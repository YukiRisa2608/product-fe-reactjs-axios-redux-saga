import { all } from 'redux-saga/effects';
import watchHomeSaga from './HomeSagas';
import categoriesWatcherSaga from './CategorySagas';
import productsWatcherSaga from './ProductSagas';
import watchCartSaga from './CartSagas';


export default function* rootSaga() {
    yield all([
        watchHomeSaga(),
        categoriesWatcherSaga(),
        productsWatcherSaga(),
        watchCartSaga()
    ]);
}
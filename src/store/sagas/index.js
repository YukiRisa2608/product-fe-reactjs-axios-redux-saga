import { all } from 'redux-saga/effects';
import watchHomeSaga from './HomeSagas';
import categoriesWatcherSaga from './CategorySagas';
import productsWatcherSaga from './ProductSagas';
import watchCartSaga from './CartSagas';
import watchAuthSaga from './AuthSagas';
import watchOrderSaga from './OrderSagas';
import usersWatcherSaga from './UserSagas';

export default function* rootSaga() {
    yield all([
        watchHomeSaga(),
        categoriesWatcherSaga(),
        productsWatcherSaga(),
        watchCartSaga(),
        watchAuthSaga(),
        watchOrderSaga(),
        usersWatcherSaga()
    ]);
}
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from './reducers/CategoryReducers';
import categoriesWatcherSaga from './sagas/CategorySagas';
import productsReducer from './reducers/ProductReducers';
import productsWatcherSaga from './sagas/ProductSagas';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(categoriesWatcherSaga);
sagaMiddleware.run(productsWatcherSaga);

export default store;

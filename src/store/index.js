import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from './reducers/CategoryReducers';
import productsReducer from './reducers/ProductReducers';
import homeReducer from './reducers/HomeReducers';
import rootSaga from './sagas';
import cartReducer from './reducers/CartReducers';
import authReducer from './reducers/AuthReducers';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  home: homeReducer,
  cart: cartReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

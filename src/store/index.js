import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from './reducers/CategoryReducers';
import productsReducer from './reducers/ProductReducers';
import homeReducer from './reducers/HomeReducers';
import rootSaga from './sagas';
import cartReducer from './reducers/CartReducers';
import authReducer from './reducers/AuthReducers';
import orderReducer from './reducers/OrderReducers';
import usersReducer from './reducers/UserReducers';
import roleReducer from './reducers/RoleReducers';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  home: homeReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  users: usersReducer,
  role: roleReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from './reducers/CategoryReducers';
import categoriesWatcherSaga from './sagas/CategorySagas';

const rootReducer = combineReducers({
  categories: categoriesReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(categoriesWatcherSaga);

export default store;

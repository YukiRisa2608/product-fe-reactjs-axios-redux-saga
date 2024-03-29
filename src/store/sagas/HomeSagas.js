import { call, put, takeEvery } from 'redux-saga/effects';
import HomeService from '../../api/HomeServices';
import * as HomeActions from '../actions/HomeActions';
import * as HomeTypes from "../types/HomeTypes";

//get all
function* fetchHomeItemsSaga(action) {
	try {
		const page = action.payload;
		const response = yield call(HomeService.getList, { page });
		yield put(HomeActions.getHomeItemsSuccess(response.data, response.pages));
	} catch (error) {
		yield put(HomeActions.getHomeItemsFailure(error.message));
	}
}

//sort
function* sortProductsSaga(action) {
	try {
	  const response = yield call(sortProductsSaga, action.payload.page, action.payload.size, action.payload.sortDirection);
	  yield put({ type: HomeTypes.GET_SORT_SUCCESS, payload: response.data });
	} catch (error) {
	  yield put({ type: HomeTypes.GET_SORT_FAILURE, error });
	}
  }
  
  
//watch saga
function* watchHomeSaga() {
	yield takeEvery(HomeTypes.GET_HOME_ITEMS_REQUEST, fetchHomeItemsSaga);
	yield takeEvery(HomeTypes.GET_SORT_REQUEST, sortProductsSaga);
}

export default watchHomeSaga;

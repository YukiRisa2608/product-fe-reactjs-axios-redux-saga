import { call, put, takeEvery } from 'redux-saga/effects';
import homeService from '../../api/HomeServices';
import * as HomeActions from '../actions/HomeActions';
import * as HomeTypes from "../types/HomeTypes";

//get all
function* fetchHomeItemsSaga(action) {
	try {
		const page = action.payload;
		const response = yield call(homeService.getList, { page });
		yield put(HomeActions.getHomeItemsSuccess(response.data, response.pages));
	} catch (error) {
		yield put(HomeActions.getHomeItemsFailure(error.message));
	}
}

//watch saga
function* watchHomeSaga() {
	yield takeEvery(HomeTypes.GET_HOME_ITEMS_REQUEST, fetchHomeItemsSaga);
}

export default watchHomeSaga;

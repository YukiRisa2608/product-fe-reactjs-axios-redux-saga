import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/HomeServices';
import * as HomeActions from '../actions/HomeActions';
import * as HomeTypes from "../types/HomeTypes";

function* fetchHomeItemsSaga(action) {
	try {
		const page = action.payload;
		const response = yield call(api.getList, { page });
		console.log(response.totalElements);
		yield put(HomeActions.getHomeItemsSuccess(response.data, response.pages));
	} catch (error) {
		yield put(HomeActions.getHomeItemsFailure(error.message));
	}
}

function* watchHomeSaga() {
	yield takeEvery(HomeTypes.GET_HOME_ITEMS_REQUEST, fetchHomeItemsSaga);
}

export default watchHomeSaga;

import { put, call } from 'redux-saga/effects';
// import { getDemo } from '../api';
import * as types from '../types/HomeType';
import { getLike } from '../../api/HomeService';

const errorData = {like: 10000}
export function* getLikeSaga({ payload }) {
	try {
        console.log('getLikeSaga')
		const demoData = yield call(getLike, payload);

		yield put({ type: types.GET_LIKE_DONE, demoData });
	} catch (error) {
		yield put({ type: types.GET_LIKE_DONE, errorData});
	}
}
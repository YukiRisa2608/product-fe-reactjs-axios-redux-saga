import { all, takeLatest } from 'redux-saga/effects';
import { getLikeSaga } from './HomeSaga';

import * as types from '../types/HomeType';

export default function* rootSaga() {
	yield all([
        takeLatest(types.GET_LIKE, getLikeSaga)
    ]);
}
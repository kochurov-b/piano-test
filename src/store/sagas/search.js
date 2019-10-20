import { takeLatest, call, select, put } from "redux-saga/effects";

import { searchConstants } from "../constants/search";
import { fetchData } from "./helpers";
import { getSearchData } from "../actions/search";

export function* fetchSearchData() {
  try {
    const {
      search: { query }
    } = yield select();
    const { items } = yield call(fetchData, {
      query
    });
    yield put(getSearchData.success(items));
  } catch (error) {
    yield put(getSearchData.failure(error));
  }
}

export function* watcherSearchData() {
  yield takeLatest(searchConstants.GET_SEARCH_DATA.REQUEST, fetchSearchData);
}

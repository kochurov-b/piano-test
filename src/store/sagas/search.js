import { takeLatest, call, put } from "redux-saga/effects";

import { searchConstants } from "../constants/search";
import { fetchData } from "./helpers";
import { getSearchData } from "../actions/search";
import config from "../../config";

export function* fetchSearchData(action) {
  try {
    const { items } = yield call(fetchData, {
      actionPath: config.SEARCH_PATH,
      query: action.payload
    });
    yield put(getSearchData.success(items));
  } catch (error) {
    yield put(getSearchData.failure(error));
  }
}

export function* watcherSearchData() {
  yield takeLatest(searchConstants.GET_SEARCH_DATA.REQUEST, fetchSearchData);
}

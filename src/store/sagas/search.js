import { takeLatest, call, put } from "redux-saga/effects";

import { searchConstants } from "../constants/search";
import { fetchData } from "./helpers";
import { getSearchData } from "../actions/search";
import config from "../../config";

export function* fetchSearchData(action) {
  try {
    const { query, page } = action.payload;
    const { items, has_more } = yield call(fetchData, {
      actionPath: config.SEARCH_PATH,
      query,
      page
    });
    yield put(getSearchData.success({ items, has_more }));
  } catch (error) {
    yield put(getSearchData.failure(error));
  }
}

export function* watcherSearchData() {
  yield takeLatest(searchConstants.GET_SEARCH_DATA.REQUEST, fetchSearchData);
}

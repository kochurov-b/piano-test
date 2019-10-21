import { takeLatest, call, put } from "redux-saga/effects";

import { faqsConstants } from "../constants/faqs";
import { fetchData } from "./helpers";
import { getTopFaqs } from "../actions/faqs";
import config from "../../config";

export function* fetchFaqsData(action) {
  try {
    const { TAGS_PATH, FAQ_PATH } = config;
    const { items } = yield call(fetchData, {
      actionPath: `${TAGS_PATH}/${action.payload}${FAQ_PATH}`
    });
    yield put(getTopFaqs.success(items));
  } catch (error) {
    yield put(getTopFaqs.failure(error));
  }
}

export function* watcherTopFaqs() {
  yield takeLatest(faqsConstants.GET_TOP_FAQS.REQUEST, fetchFaqsData);
}

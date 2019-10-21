import { takeLatest, call, put } from "redux-saga/effects";

import { topQuestionsConstants } from "../constants/topQuestions";
import { fetchData } from "./helpers";
import { getTopQuestions } from "../actions/topQuestions";
import config from "../../config";

export function* fetchTopQuestionsData(action) {
  try {
    const { USERS_PATH, QUESTIONS_PATH } = config;

    const { items } = yield call(fetchData, {
      actionPath: `${USERS_PATH}/${action.payload}${QUESTIONS_PATH}`,
      sort: "votes"
    });

    yield put(getTopQuestions.success(items));
  } catch (error) {
    yield put(getTopQuestions.failure(error));
  }
}

export function* watcherTopQuestions() {
  yield takeLatest(
    topQuestionsConstants.GET_TOP_QUESTIONS.REQUEST,
    fetchTopQuestionsData
  );
}

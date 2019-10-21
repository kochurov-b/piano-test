import { all, fork } from "redux-saga/effects";
import { watcherSearchData } from "./search";
import { watcherTopFaqs } from "./faqs";
import { watcherTopQuestions } from "./topQuestions";

export default function* rootSaga() {
  yield all([
    fork(watcherSearchData),
    fork(watcherTopFaqs),
    fork(watcherTopQuestions)
  ]);
}

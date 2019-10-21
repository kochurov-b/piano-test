import { all, fork } from "redux-saga/effects";
import { watcherSearchData } from "./search";
import { watcherTopFaqs } from "./faqs";

export default function* rootSaga() {
  yield all([fork(watcherSearchData), fork(watcherTopFaqs)]);
}

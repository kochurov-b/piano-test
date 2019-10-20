import { all, fork } from "redux-saga/effects";
import { watcherSearchData } from "./search";

export default function* rootSaga() {
  yield all([fork(watcherSearchData)]);
}

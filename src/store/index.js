import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { saveState, loadState } from "../utils/localStorage";
import { debounce } from "../utils/debounce";

const sagaMiddleware = createSagaMiddleware();
const persistentState = loadState();

const logger = createLogger({
  collapsed: true
});

export const store = createStore(
  rootReducer,
  persistentState,
  applyMiddleware(logger, sagaMiddleware)
);

store.subscribe(
  debounce(() => {
    saveState({
      search: store.getState.search,
      faqs: store.getState.faqs,
      topQuestions: store.getState.topQuestions
    });
  }, 1500)
);

sagaMiddleware.run(rootSaga);

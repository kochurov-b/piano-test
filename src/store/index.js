import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true
});

export default createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

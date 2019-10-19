import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers";

const logger = createLogger({
  collapsed: true
});

export default createStore(rootReducer, applyMiddleware(logger));

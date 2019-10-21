import { combineReducers } from "redux";
import search from "./search";
import faqs from "./faqs";
import topQuestions from "./topQuestions";
import { searchConstants } from "../constants/search";

const appReducer = combineReducers({
  search,
  faqs,
  topQuestions
});

export const rootReducer = (state, action) => {
  if (action.type === searchConstants.SEARCH_QUERY) {
    state = undefined;
  }

  return appReducer(state, action);
};

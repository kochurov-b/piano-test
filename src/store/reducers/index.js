import { combineReducers } from "redux";
import search from "./search";
import faqs from "./faqs";
import topQuestions from "./topQuestions";

export default combineReducers({
  search,
  faqs,
  topQuestions
});

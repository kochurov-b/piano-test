import { combineReducers } from "redux";
import search from "./search";
import faqs from "./faqs";

export default combineReducers({
  search,
  faqs
});

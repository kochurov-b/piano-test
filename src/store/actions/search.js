import { searchConstants } from "../constants/search";
import { getFetchActions } from "./helpers";

export const getSearchData = getFetchActions(searchConstants.GET_SEARCH_DATA);

export const setSearchQuery = query => ({
  type: searchConstants.SET_SEARCH_QUERY,
  payload: query
});

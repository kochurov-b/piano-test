import { searchConstants } from "../constants/search";
import { getFetchActions } from "./helpers";

export const getSearchData = getFetchActions(searchConstants.GET_SEARCH_DATA);

export const searchQuery = () => ({
  type: searchConstants.SEARCH_QUERY
});

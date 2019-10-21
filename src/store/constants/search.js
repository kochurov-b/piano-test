import { generateRequestTypes } from "./helpers";

const GET_SEARCH_DATA = "GET_SEARCH_DATA";
const SEARCH_QUERY = "SEARCH_QUERY";

export const searchConstants = {
  GET_SEARCH_DATA: generateRequestTypes(GET_SEARCH_DATA),
  SET_SEARCH_QUERY: SEARCH_QUERY
};

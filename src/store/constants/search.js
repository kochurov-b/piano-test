import { generateRequestTypes } from "./helpers";

export const GET_SEARCH_DATA = "GET_SEARCH_DATA";

export const searchConstants = {
  GET_SEARCH_DATA: generateRequestTypes(GET_SEARCH_DATA)
};

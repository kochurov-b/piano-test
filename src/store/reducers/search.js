import { searchConstants } from "../constants/search";

export default (state = [], action) => {
  switch (action.type) {
    case searchConstants.GET_SEARCH_DATA.SUCCESS: {
      return [...state];
    }

    default:
      return [...state];
  }
};

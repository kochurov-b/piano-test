import { searchConstants } from "../constants/search";

export default (state = {}, action) => {
  switch (action.type) {
    case searchConstants.GET_SEARCH_DATA.SUCCESS: {
      return { ...state, result: action.payload };
    }

    case searchConstants.SET_SEARCH_QUERY: {
      return {
        ...state,
        query: action.payload
      };
    }

    default:
      return { ...state };
  }
};

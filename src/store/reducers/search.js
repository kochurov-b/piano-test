import { searchConstants } from "../constants/search";

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case searchConstants.GET_SEARCH_DATA.REQUEST: {
      return { ...state, loading: true };
    }

    case searchConstants.GET_SEARCH_DATA.SUCCESS: {
      return { ...state, loading: false, result: action.payload };
    }

    case searchConstants.GET_SEARCH_DATA.FAILURE: {
      return { ...state, loading: false, error: action.payload };
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

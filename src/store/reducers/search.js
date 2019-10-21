import { searchConstants } from "../constants/search";

export default (state = { loading: false, result: [] }, action) => {
  switch (action.type) {
    case searchConstants.GET_SEARCH_DATA.REQUEST: {
      return { ...state, loading: true };
    }

    case searchConstants.GET_SEARCH_DATA.SUCCESS: {
      const { items, has_more } = action.payload;
      return {
        ...state,
        loading: false,
        has_more,
        result: [...state.result, ...items]
      };
    }

    case searchConstants.GET_SEARCH_DATA.FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return { ...state };
  }
};

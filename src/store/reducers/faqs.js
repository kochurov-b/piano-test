import { faqsConstants } from "../constants/faqs";

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case faqsConstants.GET_TOP_FAQS.REQUEST: {
      return { ...state, loading: true };
    }

    case faqsConstants.GET_TOP_FAQS.SUCCESS: {
      return { ...state, loading: false, result: action.payload };
    }

    case faqsConstants.GET_TOP_FAQS.FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return { ...state };
  }
};

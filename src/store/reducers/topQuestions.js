import { topQuestionsConstants } from "../constants/topQuestions";

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case topQuestionsConstants.GET_TOP_QUESTIONS.REQUEST: {
      return { ...state, loading: true };
    }

    case topQuestionsConstants.GET_TOP_QUESTIONS.SUCCESS: {
      return { ...state, loading: false, result: action.payload };
    }

    case topQuestionsConstants.GET_TOP_QUESTIONS.FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return { ...state };
  }
};

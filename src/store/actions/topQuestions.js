import { topQuestionsConstants } from "../constants/topQuestions";
import { getFetchActions } from "./helpers";

export const getTopQuestions = getFetchActions(
  topQuestionsConstants.GET_TOP_QUESTIONS
);

import { generateRequestTypes } from "./helpers";

const GET_TOP_QUESTIONS = "GET_TOP_QUESTIONS";

export const topQuestionsConstants = {
  GET_TOP_QUESTIONS: generateRequestTypes(GET_TOP_QUESTIONS)
};

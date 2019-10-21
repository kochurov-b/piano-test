import { generateRequestTypes } from "./helpers";

const GET_TOP_FAQS = "GET_TOP_FAQS";

export const faqsConstants = {
  GET_TOP_FAQS: generateRequestTypes(GET_TOP_FAQS)
};

import { faqsConstants } from "../constants/faqs";
import { getFetchActions } from "./helpers";

export const getTopFaqs = getFetchActions(faqsConstants.GET_TOP_FAQS);

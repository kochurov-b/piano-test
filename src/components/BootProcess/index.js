import React from "react";
import { useSelector } from "react-redux";

import Notification from "../Notification";

export default ({ children, fromLocation }) => {
  const { loading, error } = useSelector(state =>
    fromLocation === "search"
      ? state.search
      : fromLocation === "faqs"
      ? state.faqs
      : state.topQuestions
  );

  return error ? (
    <Notification
      name="Oops, something went wrong!"
      linkName="Please try again"
      linkTo="/"
      className="notification--error"
    />
  ) : loading ? (
    <Notification name="Loading ..." className="notification--loading" />
  ) : (
    <div>{children}</div>
  );
};

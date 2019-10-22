import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Notification from "../Notification";

export default ({ children, fromLocation }) => {
  const { loading, error } = useSelector(state =>
    fromLocation === "search"
      ? state.search
      : fromLocation === "faqs"
      ? state.faqs
      : state.topQuestions
  );

  return (
    <>
      <CSSTransition
        in={error}
        appear
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="slide-in"
      >
        <Notification
          name="Oops, something went wrong!"
          linkName="Please try again"
          linkTo="/"
          className="notification--error"
        />
      </CSSTransition>
      <CSSTransition
        in={loading}
        appear
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="slide-in"
      >
        <Notification name="Loading ..." className="notification--loading" />
      </CSSTransition>
      {!error && !loading && <div>{children}</div>}
    </>
  );
};

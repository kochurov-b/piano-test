import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Notification from "../Notification";

export default ({ children, fromLocation }) => {
  const { loading, error, result = [] } = useSelector(
    state => state[fromLocation]
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
      <CSSTransition
        in={!loading && !error && result.length === 0}
        appear
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="slide-in"
      >
        <Notification
          name={"No results were found for your request! Please, try again."}
          className="notification--notice"
        />
      </CSSTransition>
      {!error && !loading && result.length !== 0 && <div>{children}</div>}
    </>
  );
};

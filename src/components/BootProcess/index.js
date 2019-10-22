import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Notification from "../Notification";
import { SearchResultContext } from "../../utils/context";

export default ({ children, fromLocation }) => {
  const { loading, error, result = [] } = useSelector(
    state => state[fromLocation]
  );
  const { setIsOpenPanel } = useContext(SearchResultContext);

  useEffect(() => {
    if (
      fromLocation !== "search" &&
      !loading &&
      !error &&
      result.length !== 0
    ) {
      setIsOpenPanel(true);
    }
  });

  return (
    <>
      <CSSTransition
        in={error ? true : false}
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
      {!error && !loading && result.length !== 0 && <>{children}</>}
    </>
  );
};

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Notification from "../Notification";
import Table from "../Table";

import "./styles.css";
import { useInfiniteScroll } from "../../hooks";
import { getSearchData } from "../../store/actions/search";

export default () => {
  const { result = [], has_more } = useSelector(state => state.search);
  const { count, loading } = useInfiniteScroll(has_more);
  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => {
    loading &&
      has_more &&
      dispatch(getSearchData.request({ query, page: count }));
  });

  return (
    <>
      <CSSTransition
        in={result.length === 0}
        appear
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="slide-in"
      >
        <Notification
          name="No results were found for your request!"
          linkName="Please try again"
          linkTo="/"
          className="notification--notice"
        />
      </CSSTransition>

      <div className="search-result">
        <h2>Search results - {query}</h2>
        {result.length !== 0 && (
          <div className="search-result__table">
            <Table bodyData={result} fromLocation="search" />
          </div>
        )}
      </div>
    </>
  );
};

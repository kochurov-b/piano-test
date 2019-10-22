import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Table from "../Table";
import { useInfiniteScroll } from "../../hooks";
import { getSearchData } from "../../store/actions/search";

import "./styles.css";

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
      <div className="search-result">
        <h2>Search results - {query}</h2>
        {result.length !== 0 && (
          <div className="search-result__table">
            <Table fromLocation="search" />
          </div>
        )}
      </div>
    </>
  );
};

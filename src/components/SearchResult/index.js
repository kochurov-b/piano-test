import React from "react";
import { useSelector } from "react-redux";

import Notification from "../Notification";
import Table from "../Table";

import "./styles.css";

export default () => {
  const { loading, error, result = [] } = useSelector(state => state.search);

  return (
    <>
      <div className="search-result">
        <h2>Search results</h2>
        {loading ? (
          <Notification name="Loading ..." className="notification--loading" />
        ) : (
          <div className="search-result__table">
            <Table bodyData={result} fromLocation="search" />
          </div>
        )}

        {error ? (
          <Notification
            name="Oops, something went wrong!"
            linkName="Please try again"
            linkTo="/"
            className="notification--error"
          />
        ) : (
          !loading &&
          result.length === 0 && (
            <Notification
              name="No results were found for your request!"
              linkName="Please try again"
              linkTo="/"
              className="notification--notice"
            />
          )
        )}
      </div>
    </>
  );
};

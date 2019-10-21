import React from "react";
import { useSelector } from "react-redux";

import Notification from "../Notification";
import Table from "../Table";

import "./styles.css";

export default () => {
  const { result = [] } = useSelector(state => state.search);

  return (
    <>
      <div className="search-result">
        <h2>Search results</h2>
        {result.length === 0 ? (
          <Notification
            name="No results were found for your request!"
            linkName="Please try again"
            linkTo="/"
            className="notification--notice"
          />
        ) : (
          <div className="search-result__table">
            <Table bodyData={result} fromLocation="search" />
          </div>
        )}
      </div>
    </>
  );
};

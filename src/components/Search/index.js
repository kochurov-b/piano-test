import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../FormElements/Input";
import Button from "../Button";
import Form from "../Form";
import BootProcess from "../BootProcess";
import { getSearchData, searchQuery } from "../../store/actions/search";

import "./styles.css";

export default () => {
  const [inputSearch, setInputSearch] = useState("");
  const [toResultSearch, setToResultSearch] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitForm = event => {
    event.preventDefault();
    localStorage.removeItem("state");
    setToResultSearch(true);
    dispatch(searchQuery());
    dispatch(getSearchData.request({ query: inputSearch }));
  };

  return (
    <>
      {toResultSearch && (
        <BootProcess fromLocation="search">
          <Redirect to={`/search/q=${inputSearch}`} />
        </BootProcess>
      )}

      <div className="search">
        <Form className="form--search" onSubmit={handleSubmitForm}>
          <Input
            type="text"
            label="search"
            className="input--search"
            onChange={event => setInputSearch(event.target.value)}
            placeholder="Enter your question"
          />
          <Button
            type="submit"
            className="button--search"
            disabled={inputSearch.trim().length !== 0 ? false : true}
          >
            Search
          </Button>
        </Form>
      </div>
    </>
  );
};

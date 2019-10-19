import React, { useState } from "react";

import Input from "../FormElements/Input";
import Button from "../Button";

import "./styles.css";
import Form from "../Form";

export default () => {
  const [inputSearch, setInputSearch] = useState("");

  const handleSubmitForm = event => {
    event.preventDefault();
    console.log(inputSearch.trim());
  };

  return (
    <div className="search">
      <h1>Search by Stack Overflow</h1>
      <Form className="form--search" onSubmit={handleSubmitForm}>
        <Input
          type="text"
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
  );
};

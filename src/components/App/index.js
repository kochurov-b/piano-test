import React from "react";

import "./App.css";

export default ({ children }) => {
  return (
    <div className="App">
      <h1>Search by Stack Overflow</h1>
      {children}
    </div>
  );
};

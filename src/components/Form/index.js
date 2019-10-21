import React from "react";

import "./styles.css";

export default ({ className, onSubmit, children }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
);

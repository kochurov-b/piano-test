import React from "react";

import "./styles.css";

export default ({ type, onChange, className, placeholder }) => (
  <input
    type={type}
    className={className}
    onChange={onChange}
    placeholder={placeholder}
  />
);

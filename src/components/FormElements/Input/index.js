import React from "react";

import "./styles.css";

export default ({ type, label, onChange, className, placeholder }) => (
  <label aria-label={label}>
    <input
      type={type}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  </label>
);

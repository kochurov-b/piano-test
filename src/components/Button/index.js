import React from "react";

import "./styles.css";

export default ({ children, onClick, className, disabled, ...attrs }) => {
  return (
    <button
      {...attrs}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

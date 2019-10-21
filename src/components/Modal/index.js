import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

export default ({ children, modalClose }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div onClick={modalClose} className="modal__overlay" />
      <div className="modal__wrapper">{children}</div>
    </div>,
    document.getElementById("modal")
  );
};

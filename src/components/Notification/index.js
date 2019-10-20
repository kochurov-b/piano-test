import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default ({ name, linkName, linkTo, className }) => (
  <div className={`notification ${className}`}>
    <span className="notification__name">{name}</span>
    {linkTo && linkName && <Link to={linkTo}>{linkName}</Link>}
  </div>
);

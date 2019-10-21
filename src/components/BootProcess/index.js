import React from "react";
import { useSelector } from "react-redux";

import Notification from "../Notification";

export default ({ children }) => {
  const { loading } = useSelector(state => state.faqs);
  return loading ? (
    <Notification name="Loading ..." className="notification--loading" />
  ) : (
    <div>{children}</div>
  );
};

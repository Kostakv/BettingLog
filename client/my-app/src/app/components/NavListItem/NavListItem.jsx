import React from "react";
import "./style.css";

export const NavListItem = ({
  className,
  divClassName,
  text = "List Item",
}) => {
  return (
    <div className={`nav-list-item ${className}`}>
      <div className={`list-item ${divClassName}`}>{text}</div>
    </div>
  );
};
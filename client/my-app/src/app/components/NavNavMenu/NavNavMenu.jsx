import React from "react";

import { NavListItem } from "../NavListItem";
import "./style.css";

export default function NavNavMenu () {
  return (
    <div className="nav-nav-menu">
      <NavListItem
        className="nav-list-item-instance"
        divClassName="design-component-instance-node"
        text="About"
      />
      <NavListItem
        className="nav-list-item-instance"
        divClassName="design-component-instance-node"
        text="Tools"
      />
      <NavListItem
        className="nav-list-item-instance"
        divClassName="design-component-instance-node"
        text="Guides"
      />
      <NavListItem
        className="nav-list-item-instance"
        divClassName="design-component-instance-node"
        text="Community"
      />
      <NavListItem
        className="nav-list-item-instance"
        divClassName="design-component-instance-node"
        text="Sign In"
      />
      <div className="button">
        
        <button className="text-wrapper">Sign up</button>
      </div>
    </div>
  );
};

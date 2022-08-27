import React from "react";
import NavLink from "./NavLink";
import colors from "../colors";

class Nav extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      borderBottom: `1px solid ${colors.header.fg}`,
      backgroundColor: "inherit",
      fontSize: "inherit",
      fontFamily: "inherit",
      color: "inherit",
    };
  }

  render() {
    this._links = this.props.linkItems.map((li, index) => {
      return (
        <NavLink
          key={index}
          href={li.href}
          text={li.text}
          onClick={li.onClick}
        />
      );
    });

    return <nav style={this._initStyles}>{this._links}</nav>;
  }
}

export default Nav;

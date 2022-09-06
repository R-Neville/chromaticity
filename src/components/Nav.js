import React from "react";
import NavLink from "./NavLink";
import colors from "../colors";
import universalStyles from "../universal-styles";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid ${colors.header.color}`,
      backgroundColor: "inherit",
      fontSize: "inherit",
      fontFamily: "inherit",
      color: "inherit",
    };
  }

  render() {
    const links = this.props.linkItems.map((li, index) => {
      return (
        <NavLink
          key={index}
          active={li.active}
          text={li.text}
          onClick={li.onClick}
        />
      );
    });

    return <nav style={this._initStyles}>{links}</nav>;
  }
}

export default Nav;

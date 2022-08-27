import React from "react";
import colors from "../colors";
import Nav from "./Nav";
import universalStyles from "../universal-styles";

class Header extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      alignItems: "center",
      padding: "1em",
      boxSizing: "border-box",
      fontSize: "inherit",
      fontFamily: "inherit",
      ...colors.header,
    };
  }

  render() {
    return (
      <header style={this._initStyles}>
        <h1>Chormaticity</h1>
        <Nav linkItems={this.props.linkItems} />
      </header>
    );
  }
}

export default Header;

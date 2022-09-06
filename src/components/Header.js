import React from "react";
import colors from "../colors";
import Nav from "./Nav";
import universalStyles from "../universal-styles";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: "1em",
      boxSizing: "border-box",
      fontSize: "inherit",
      fontFamily: "inherit",
      ...colors.header,
      userSelect: "none",
    };
  }

  render() {
    return (
      <header style={this._initStyles}>
        <h1
          style={{
            ...universalStyles,
            display: "flex",
            alignItems: "center",
            margin: 0,
          }}
        >
          Chormaticity
        </h1>
        <Nav linkItems={this.props.linkItems} />
      </header>
    );
  }
}

export default Header;

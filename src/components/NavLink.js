import React from "react";
import colors from "../colors";

class NavLink extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      padding: "0.5em 1em",
      backgroundColor: "inherit",
      fontSize: "inherit",
      fontFamily: "inherit",
      color: "inherit",
      textDecoration: "none",
    };
  }

  render() {
    this._anchor = (
      <a
        style={this._initStyles}
        href={this.props.href}
        onClick={this.props.onClick}
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}
      >
        {this.props.text}
      </a>
    );

    return <>{this._anchor}</>;
  }

  _onMouseEnter(event) {
    event.target.style.backgroundColor = colors.header.fg;
    event.target.style.color = colors.header.bg;
  }

  _onMouseLeave(event) {
    event.target.style.backgroundColor = "inherit";
    event.target.style.color = "inherit";
  }
}

export default NavLink;

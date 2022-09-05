import React from "react";
import { applyStyles } from "../helpers";
import colors from "../colors";
import universalStyles from "../universal-styles";

class NavLink extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      padding: "0.5em 1em",
      fontSize: "inherit",
      fontFamily: "inherit",
      textDecoration: "none",
      ...colors.navLink.inactive,
    };
  }

  render() {
    let classes = ["nav-link"];

    if (this.props.active) {
      this._initStyles.backgroundColor = colors.navLink.active.backgroundColor;
      this._initStyles.color = colors.navLink.active.color;
      classes.push("active");
    }

    this._anchor = (
      <a
        className={classes.join(" ")}
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
    const anchor = event.target;
    if (!anchor.classList.contains("active")) {
      applyStyles(anchor, colors.navLink.active);
    }
  }

  _onMouseLeave(event) {
    const anchor = event.target;
    if (!anchor.classList.contains("active")) {
      applyStyles(anchor, colors.navLink.inactive);
    }
  }
}

export default NavLink;

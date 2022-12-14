import React from "react";
import { applyStyles } from "../helpers";
import colors from "../colors";
import universalStyles from "../universal-styles";

class NavLink extends React.Component {
  render() {
    return (
      <div
        key={this.props.active}
        style={{
          ...universalStyles,
          padding: "0.5em 1em",
          fontSize: "inherit",
          fontFamily: "inherit",
          textDecoration: "none",
          cursor: "pointer",
          ...(this.props.active
            ? colors.navLink.active
            : colors.navLink.inactive),
        }}
        onClick={this.props.onClick}
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}
      >
        {this.props.text}
      </div>
    );
  }

  _onMouseEnter(event) {
    const link = event.target;
    if (!this.props.active) {
      applyStyles(link, colors.navLink.active);
    }
  }

  _onMouseLeave(event) {
    const link = event.target;
    if (!this.props.active) {
      applyStyles(link, colors.navLink.inactive);
    }
  }
}

export default NavLink;

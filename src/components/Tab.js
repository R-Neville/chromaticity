import React from "react";
import colors from "../colors";
import universalStyles from "../universal-styles";

class Tab extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      ...universalStyles,
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5em 1em",
      backgroundColor: "inherit",
      color: "inherit",
      cursor: "pointer",
      userSelect: "none",
      ...colors.tab.inactive,
    };
  }

  render() {
    this.props.classes.push("tab");
    if (this.props.active) {
      this._initStyles.backgroundColor = colors.tab.active.backgroundColor;
      this._initStyles.color = colors.tab.active.color;
      this.props.classes.push("active");
    }

    return (
      <div
        className={this.props.classes.join(" ")}
        style={this._initStyles}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Tab;

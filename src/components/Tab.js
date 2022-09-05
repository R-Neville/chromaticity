import React from "react";
import colors from "../colors";
import universalStyles from "../universal-styles";

class Tab extends React.Component {
  constructor(props) {
    super(props);

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
      userSelect: "none"
    };

    this._classes = new Set([...this.props.classes, "tab"]);
  }

  render() {
    if (this.props.active) {
      this._classes.add("active");
    } else {
      this._classes.delete("active");
    }

    return (
      <div
        className={[...this._classes].join(" ")}
        style={{
          ...this._initStyles,
          ...(this.props.active ? colors.tab.active : colors.tab.inactive)
        }}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Tab;

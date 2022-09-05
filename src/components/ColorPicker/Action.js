import React from "react";
import colors from "../../colors";
import universalStyles from "../../universal-styles";

class Action extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      padding: "0.5em 1em",
      border: `1px solid ${colors.colorPicker.color}`,
      borderRadius: "3px",
      outline: "none",
      margin: "0.5em 1em",
      backgroundColor: colors.colorPicker.color,
      fontSize: "1em",
      color: colors.colorPicker.backgroundColor,
      cursor: "pointer",
    };
  }

  render() {
    return (
      <button
        className="action"
        style={this._initStyles}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Action;

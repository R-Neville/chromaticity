import React from "react";
import universalStyles from "../universal-styles";

class ReadOnlyInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this._initStyles = {
      ...universalStyles,
      width: "100%",
      height: "100%",
      border: "none",
      backgroundColor: "inherit",
      fontSize: "1em",
      color: "inherit",
    };
  }

  render() {
    return (
      <input
        className="read-only"
        style={this._initStyles}
        value={this.state.value}
        disabled
      />
    );
  }
}

export default ReadOnlyInput;

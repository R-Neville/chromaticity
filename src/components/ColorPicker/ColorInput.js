import React from "react";
import universalStyles from "../../universal-styles";

const RGB_MODE = "RGB";

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this._colorName = this.props.colorName;
    this._id = this.props.id;
  }

  render() {
    return (
      <input
        type="text"
        key={this.props.value}
        defaultValue={
          this.props.mode === RGB_MODE
            ? this.props.value
            : rgbToHex(this.props.value)
        }
        onBlur={this._onBlur.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
        style={{
          ...universalStyles,
          width: "40px",
          height: "30px",
          border: "1px solid #000",
          borderRadius: "3px",
        }}
      ></input>
    );
  }

  _onBlur(event) {
    const customEvent = new CustomEvent("color-input-changed", {
      bubbles: true,
      detail: {
        colorName: this._colorName,
        value: event.target.value,
      },
    });
    event.target.dispatchEvent(customEvent);
  }

  _onKeyDown(event) {
    if (event.key === "Enter") {
      const customEvent = new CustomEvent("color-input-changed", {
        bubbles: true,
        detail: {
          colorName: this._colorName,
          value: event.target.value,
        },
      });
      event.target.dispatchEvent(customEvent);
    }
  }
}

function rgbToHex(rgbValue) {
  const hex = rgbValue.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export default ColorInput;

import React from "react";
import universalStyles from "../../universal-styles";

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this._colorName = this.props.colorName;
  }

  render() {
    return (
      <input
        type="text"
        key={this.props.value}
        value={this.props.value}
        onChange={this._onChange.bind(this)}
        style={{
          ...universalStyles,
          width: "40px",
          height: "30px",
          border: "1px solid #000",
          borderRadius: "3px"
        }}
      ></input>
    );
  }

  _onChange(event) {
    console.log('changed');
  }
}

export default ColorInput;

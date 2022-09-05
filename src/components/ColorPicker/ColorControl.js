import React from "react";
import universalStyles from "../../universal-styles";
import ColorInput from "./ColorInput";
import Slider from "./Slider";

class ColorControl extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      margin: "0.5em 1em",
    };
  }

  render() {
    return (
      <div style={this._initStyles}>
        <Slider
          id={this.props.sliderID}
          colorName={this.props.colorName}
          bg={this.props.bg}
          value={this.props.value}
        />
        <ColorInput key={this.props.mode} mode={this.props.mode} value={this.props.value} colorName={this.props.colorName}/>
      </div>
    );
  }
}

export default ColorControl;

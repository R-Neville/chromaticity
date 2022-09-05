import React from "react";
import colors from "../../colors";
import universalStyles from "../../universal-styles";

class ColorPreview extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      padding: "1em",
      width: "100%",
      height: "200px",
    };
  }

  render() {
    let color = this.props.color || colors.preview.default;

    return (
      <div style={this._initStyles}>
        <div
          className="preview"
          style={{
            ...universalStyles,
            height: "100%",
            width: "100%",
            border: `1px solid ${colors.preview.default}`,
            borderRadius: '3px',
            backgroundColor: color,
          }}
        ></div>
      </div>
    );
  }
}

export default ColorPreview;

import React from "react";
import universalStyles from "../../universal-styles";
import colors from "../../colors";

const MAX_PREVIEW_COLORS = 4;

class PreviewCard extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      position: "relative",
      width: "200px",
      height: "200px",
      border: `1px solid ${colors.paletteCard.borderColor}`,
      borderRadius: "3px",
      margin: "0.5em",
      cursor: "pointer",
    };
  }

  render() {
    let previewColors = [];
    if (this.props.colors.length > 0) {
      const colorsLength = this.props.colors.length;
      if (colorsLength < MAX_PREVIEW_COLORS) {
        for (let i = 0; i < colorsLength; i++) {
          previewColors.push(
            this.props.colors[Math.floor(Math.random() * colors.length)]
          );
        }
      } else {
        for (let i = 0; i < MAX_PREVIEW_COLORS; i++) {
          previewColors.push(
            this.props.colors[Math.floor(Math.random() * colorsLength)]
          );
        }
      }
    }

    const previewDivs = previewColors.map((color) => {
      return <div style={{ backgroundColor: color }}></div>;
    });

    return (
      <div
        className="palette-card"
        key={this.props.name}
        style={this._initStyles}
      >
        {previewDivs}
        <div
          style={{
            position: "absolue",
            overflow: "hidden",
            padding: "0.5em 1em",
            width: "100%",
            borderTop: `1px solid ${colors.paletteCard.borderColor}`,
            borderBottom: `1px solid ${colors.paletteCard.borderColor}`,
            margin: "auto 0",
            textAlign: "center",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={this.props.name}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default PreviewCard;

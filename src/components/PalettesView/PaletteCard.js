import React from "react";
import universalStyles from "../../universal-styles";
import colors from "../../colors";
import ContextMenu from "../../custom-html-components/ContextMenu";

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
    for (let i = 0; i < this.props.colors.length; i++) {
      previewColors.push(
        this.props.colors[i]
      );
    }

    const previewDivs = previewColors.map((color, index) => {
      return <div key={`preview-color-${index}`} style={{ width: "100%", backgroundColor: color }}></div>;
    });

    return (
      <div
        className="palette-card"
        id={this.props.id}
        key={this.props.id}
        style={this._initStyles}
        onClick={this._onClick.bind(this)}
        onContextMenu={this._onContextMenu.bind(this)}
      >
        {previewDivs}
        <div
          style={{
            ...universalStyles,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            overflow: "hidden",
            padding: "0.5em",
            width: "100%",
            borderTop: `1px solid ${colors.paletteCard.borderColor}`,
            borderBottom: `1px solid ${colors.paletteCard.borderColor}`,
            backgroundColor: "#FFF",
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

  _rootEl() {
    return document.getElementById(this.props.id);
  }

  _onClick(event) {
    const customEvent = new CustomEvent("view-palette-requested", {
      bubbles: true,
      detail: {
        name: this.props.name
      }
    });
    event.target.dispatchEvent(customEvent);
  }

  _onContextMenu(event) {
    event.preventDefault();
    const rootEl = this._rootEl();
    const menu = new ContextMenu(event.pageX, event.pageY);
    menu.addOption("Rename", () => {
      const customEvent = new CustomEvent("rename-palette-requested", {
        bubbles: true,
        detail: {
          oldName: this.props.name
        }
      });
      rootEl.dispatchEvent(customEvent);
    });
    menu.addOption("Delete", () => {
      const customEvent = new CustomEvent("delete-palette-requested", {
        bubbles: true,
        detail: {
          name: this.props.name
        },
      });
      rootEl.dispatchEvent(customEvent);
    });
    document.body.appendChild(menu);
  }
}

export default PreviewCard;

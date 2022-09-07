import React from "react";
import ContextMenu from "../../custom-html-components/ContextMenu";
import universalStyles from "../../universal-styles";

class ColorCard extends React.Component {
  constructor(props) {
    super(props);

    this._id = this.props.color.slice(1); // Remove hash from color code.

    this._initStyles = {
      ...universalStyles,
      position: "relative",
      width: "100px",
      height: "100px",
      border: "1px solid #000",
      borderRadius: "3px",
      margin: "0.5em",
      backgroundColor: this.props.color,
      cursor: "pointer",
    };
  }

  render() {
    return (
      <div
        id={this._id}
        key={this.props.color}
        style={this._initStyles}
        onContextMenu={this._onContextMenu.bind(this)}
      >
        <div
          style={{
            ...universalStyles,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "5px",
            width: "100%",
            borderTop: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#FFF",
            textAlign: "center",
            fontSize: "1em",
          }}
        >
          {this.props.color}
        </div>
      </div>
    );
  }

  _rootEl() {
    return document.getElementById(this._id);
  }

  _onContextMenu(event) {
    event.preventDefault();
    const { pageX, pageY } = event;
    const menu = new ContextMenu(pageX, pageY);
    menu.addOption("Copy", () => {
      window.navigator.clipboard.writeText(this.props.color);
      const customEvent = new CustomEvent("color-copied-to-clipboard", {
        bubbles: true,
      });
      this._rootEl().dispatchEvent(customEvent);
    });
    menu.addOption("Add To Palette", () => {
      const customEvent = new CustomEvent("add-color-to-palette-requested", {
        bubbles: true,
        detail: {
          colorHEX: this.props.color,
        }
      });
      this._rootEl().dispatchEvent(customEvent);
    });
    menu.addOption("Remove", () => {
      const customEvent = new CustomEvent(
        "remove-color-from-favorites-requested",
        {
          bubbles: true,
          detail: {
            color: this.props.color,
          },
        }
      );

      this._rootEl().dispatchEvent(customEvent);
    });
    document.body.appendChild(menu);
  }
}

export default ColorCard;

import { applyStyles } from "../../helpers";
import colors from "../../colors";
import universalStyles from "../../universal-styles";
import ContextMenu from "../ContextMenu";

class PaletteView extends HTMLElement {
  constructor(palette) {
    super();

    this._palette = palette;
    this._contentWrapper = document.createElement("div");
    this._header = document.createElement("div");
    this._heading = document.createElement("h2");
    this._closeButton = document.createElement("button");
    this._closeButton.textContent = "Close";
    this._heading.textContent = this._palette.name;

    this._body = document.createElement("div");

    this.appendChild(this._contentWrapper);
    this._header.appendChild(this._heading);
    this._header.appendChild(this._closeButton);
    this._contentWrapper.appendChild(this._header);
    this._contentWrapper.appendChild(this._body);

    this._palette.colors.forEach((color) => {
      this._body.appendChild(this._buildColorCard(color));
    });

    applyStyles(this, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: "1em",
      width: "100%",
      height: "100%",
      backgroundColor: "#000000AA",
    });

    applyStyles(this._contentWrapper, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      padding: "1em",
      width: "100%",
      maxWidth: "500px",
      height: "100%",
      maxHeight: "500px",
      backgroundColor: colors.app.backgroundColor,
      color: colors.app.color,
    });

    applyStyles(this._header, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    });

    applyStyles(this._heading, {
      ...universalStyles,
      borderBottom: `1px solid ${colors.app.color}`,
      margin: 0,
    });

    applyStyles(this._closeButton, {
      ...universalStyles,
      padding: "0.5em 1em",
      border: "none",
      borderRadius: "3px",
      margin: "1em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
      cursor: "pointer",
    });

    applyStyles(this._body, {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      overflow: "auto",
      width: "100%",
    });

    this._closeButton.addEventListener("click", () => {
      const customEvent = new CustomEvent("close-palette-view", {
        bubbles: true,
      });
      this.dispatchEvent(customEvent);
    });
  }

  _buildColorCard(color) {
    const colorCard = document.createElement("div");
    const colorName = document.createElement("div");
    colorName.textContent = color;
    colorCard.appendChild(colorName);

    applyStyles(colorCard, {
      ...universalStyles,
      position: "relative",
      width: "100px",
      height: "150px",
      border: "1px solid #000",
      borderRadius: "3px",
      margin: "0.5em",
      backgroundColor: color,
    });

    applyStyles(colorName, {
      ...universalStyles,
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      padding: "5px",
      width: "100%",
      backgroundColor: "#FFF",
      fontSize: "1em",
    });

    colorCard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const { pageX, pageY } = event;
      const menu = new ContextMenu(pageX, pageY);
      menu.addOption("Remove", () => {
        const customEvent = new CustomEvent(
          "remove-color-from-palette-requested",
          {
            bubbles: true,
            detail: {
              color,
              palette: this._palette.name
            }
          }
        );
        this.dispatchEvent(customEvent);
      });
      document.body.appendChild(menu);
    });

    return colorCard;
  }

  update(palette) {
    this._palette = palette;
    Array.from(this._body.children).forEach(colorCard => {
      colorCard.remove();
    });
    this._palette.colors.forEach(color => {
      this._body.appendChild(this._buildColorCard(color));
    });
  }
}

customElements.define("palette-view", PaletteView);

export default PaletteView;

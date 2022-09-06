import { applyStyles } from "../../helpers";
import universalStyles from "../../universal-styles";
import Option from "./Option";

class ContextMenu extends HTMLElement {
  constructor(x, y) {
    super();

    applyStyles(this, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: y + "px",
      left: x + "px",
      border: "1px solid #000",
      borderRadius: "3px"
    });

    document.addEventListener("click", this._onClick.bind(this));
  }

  addOption(text, onClick) {
    this.appendChild(new Option(text, onClick));
  }

  _onClick() {
    this.remove();
    document.removeEventListener("click", this._onClick);
  }
}

customElements.define("context-menu", ContextMenu);

export default ContextMenu;

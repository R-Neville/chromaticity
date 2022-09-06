import { applyStyles } from "../../helpers";
import universalStyles from "../../universal-styles";

class Option extends HTMLElement {
  constructor(text, onClick) {
    super();

    this.textContent = text;

    applyStyles(this, {
      ...universalStyles,
      padding: "0.5em 1em",
      width: "100%",
      fontSize: "1em",
      color: "#000",
      backgroundColor: "gainsboro",
      cursor: "pointer",
    });

    this.addEventListener('click', onClick);
    this.addEventListener("mouseenter", this._onMouseEnter);
    this.addEventListener("mouseleave", this._onMouseLeave);
  }

  _onMouseEnter() {
    this.style.backgroundColor = "lightgray";
  }

  _onMouseLeave() {
    this.style.backgroundColor = "gainsboro";
  }
}

customElements.define("context-menu-option", Option);

export default Option;
import { applyStyles } from "../../helpers";
import colors from "../../colors";

class Action extends HTMLButtonElement {
  constructor(text, onClick) {
    super();

    this.textContent = text;

    applyStyles(this, {
      padding: "0.5em 1em",
      border: "none",
      borderRadius: "3px",
      outline: "none",
      marginLeft: "0.5em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
      cursor: "pointer",
    });

    this.addEventListener('click', onClick);
  }
}

customElements.define("chromaticity-action", Action, { extends: "button" });

export default Action;
import { applyStyles } from "../../helpers";
import colors from "../../colors";

class Input extends HTMLInputElement {
  constructor(onInput) {
    super();

    applyStyles(this, {
      padding: "0 5px",
      height: "30px",
      border: `1px solid ${colors.app.color}`,
      borderRadius: "3px",
      outline: "none",
      margin: "1em 0",
      fontSize: "1em",
      color: colors.app.color,
    });

    this.addEventListener("blur", onInput);
    this.addEventListener("input", onInput);
  }
}

customElements.define("chromaticity-input", Input, { extends: "input" });

export default Input;

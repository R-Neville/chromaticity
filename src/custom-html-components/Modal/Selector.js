import colors from "../../colors";
import { applyStyles } from "../../helpers";
import universalStyles from "../../universal-styles";

class Selector extends HTMLElement {
  constructor(options) {
    super();

    this._options = [];

    options.forEach(option => {
      this._addOption(option);
    });

    applyStyles(this, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      height: "200px",
      width: "100%",
      border: `1px solid ${colors.app.color}`,
      borderRadius: "3px",
      margin: "1em auto",
    });
  }

  _addOption(option) {
    const el = document.createElement("div");
    el.textContent = option;
    el.title = option;
    this._options.push(el);
    this.appendChild(el);
    applyStyles(el, {
      ...universalStyles,
      overflow: "hidden",
      padding: "5px",
      width: "100%",
      backgroundColor: colors.app.backgroundColor,
      fontSize: "1em",
      wordWrap: "nowrap",
      textOverflow: "ellipsis",
      color: colors.app.color,
      cursor: "pointer",
    });
    el.addEventListener("mouseenter", () => {
      if (!el.classList.contains("selected")) {
        el.style.backgroundColor = colors.app.color;
        el.style.color = colors.app.backgroundColor;
      }
    });
    el.addEventListener("mouseleave", () => {
      if (!el.classList.contains("selected")) {
        el.style.backgroundColor = colors.app.backgroundColor;
        el.style.color = colors.app.color;
      }
    });
    el.addEventListener("click", () => {
      this._options.forEach((option) => {
        if (option.classList.contains("selected")) {
          option.classList.remove("selected");
          option.style.backgroundColor = colors.app.backgroundColor;
          option.style.color = colors.app.color;
        }
      });
      el.classList.add("selected");
      el.style.backgroundColor = colors.app.color;
      el.style.color = colors.app.backgroundColor;
      const customEvent = new CustomEvent("selection-changed", {
        bubbles: true,
        detail: {
          newValue: option
        }
      });
      this.dispatchEvent(customEvent);
    });
  }
}

customElements.define("custom-selector", Selector);

export default Selector;

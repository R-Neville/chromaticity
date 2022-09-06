import colors from "../../colors";
import { applyStyles } from "../../helpers";
import Input from "./Input";
import Action from "./Action";
import universalStyles from "../../universal-styles";
import Selector from "./Selector";

class Modal extends HTMLElement {
  constructor(text) {
    super();

    this._valid = false;
    this._text = text;
    this._input = null;
    this._selector = null;
    this._selection = null;
    this._actions = [];

    this._contentWrapper = document.createElement("div");
    this._header = document.createElement("div");
    this._header.textContent = text;
    this._body = document.createElement("div");
    this._actions = document.createElement("div");

    this.appendChild(this._contentWrapper);
    this._contentWrapper.appendChild(this._header);
    this._contentWrapper.appendChild(this._body);
    this._body.appendChild(this._actions);

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
      backgroundColor: "#000000AA",
      userSelect: "none",
    });

    applyStyles(this._contentWrapper, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "500px",
    });

    applyStyles(this._header, {
      ...universalStyles,
      padding: "1em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
    });

    applyStyles(this._body, {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      padding: "1em",
      backgroundColor: colors.app.backgroundColor,
    });


    applyStyles(this._actions, {
      ...universalStyles,
      display: "flex",
      justifyContent: "flex-end",
    });

    this.addEventListener("lock", (event) => {
      event.stopPropagation();
      this._valid = false;
      applyStyles(this._input, {
        ...colors.flashMessage.error,
      });
    });
    this.addEventListener("unlock", (event) => {
      event.stopPropagation();
      this._valid = true;
      applyStyles(this._input, {
        borderColor: colors.app.color,
        backgroundColor: colors.app.backgroundColor,
        color: colors.app.color,
      });
    });
    this.addEventListener("selection-changed", (event) => {
      event.stopPropagation();
      const { newValue } = event.detail;
      this._selection = newValue;
      this._valid = true;
    });
  }

  get valid() {
    return this._valid;
  }

  get inputValue() {
    if (this._input) {
      return this._input.value;
    }
    return null;
  }

  get selection() {
    return this._selection;
  }

  addInput(onInput, initialValue) {
    this._input = new Input(onInput, initialValue);
    this._body.insertBefore(this._input, this._actions);
  }

  addSelector(options) {
    this._selector = new Selector(options);
    this._body.insertBefore(this._selector, this._actions);
  }

  addAction(text, onClick) {
    const action = new Action(text, onClick);
    this._actions.appendChild(action);
  }
}

customElements.define("custom-modal", Modal);

export default Modal;

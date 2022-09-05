import colors from "../colors";
import { applyStyles } from "../helpers";

class Modal extends HTMLElement {
  constructor(text, onConfirm, onBlur) {
    super();

    this._valid = false;
    this._text = text;

    this._contentWrapper = document.createElement("div");
    this._header = document.createElement("div");
    this._header.textContent = text;
    this._body = document.createElement("div");
    if (onBlur) this._input = document.createElement("input");
    this._actions = document.createElement("div");
    this._confirmAction = document.createElement("button");
    this._confirmAction.textContent = "Confirm";
    this._cancelAction = document.createElement("button");
    this._cancelAction.textContent = "Cancel";

    this.appendChild(this._contentWrapper);
    this._contentWrapper.appendChild(this._header);
    this._contentWrapper.appendChild(this._body);
    if (this._input) this._body.appendChild(this._input);
    this._body.appendChild(this._actions);
    this._actions.appendChild(this._cancelAction);
    this._actions.appendChild(this._confirmAction);

    applyStyles(this, {
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "column",
    });

    applyStyles(this._header, {
      padding: "1em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
    });

    applyStyles(this._body, {
      display: "flex",
      flexDirection: "column",
      backgroundColor: colors.app.backgroundColor,
    });

    if (this._input) {
      applyStyles(this._input, {
        padding: "0 5px",
        height: '30px',
        border: `1px solid ${colors.app.color}`,
        borderRadius: "3px",
        outline: "none",
        margin: "1em",
        fontSize: "1em",
        color: colors.app.color,
      });
    }

    applyStyles(this._actions, {
      display: "flex",
      justifyContent: "space-between",
    });

    applyStyles(this._confirmAction, {
      padding: "0.5em 1em",
      border: "none",
      borderRadius: "3px",
      outline: "none",
      margin: "1em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
      cursor: "pointer",
    });

    applyStyles(this._cancelAction, {
      padding: "0.5em 1em",
      border: "none",
      borderRadius: "3px",
      outline: "none",
      margin: "1em",
      backgroundColor: colors.app.color,
      fontSize: "1em",
      color: colors.app.backgroundColor,
      cursor: "pointer",
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
    if (this._input) this._input.addEventListener("blur", onBlur);
    this._cancelAction.addEventListener("click", () => this.remove());
    this._confirmAction.addEventListener("click", () => {
      if (this._valid) {
        setTimeout(() => {
          onConfirm(this._input.value);
          setTimeout(() => {
            this.remove();
          });
        });
      }
    });
  }
}

customElements.define("custom-modal", Modal);

export default Modal;

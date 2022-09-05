import React from "react";
import { applyStyles } from "../../helpers";
import colors from "../../colors";
import StoreManager from "../../StoreManager";
import TabBar from "../TabBar";
import universalStyles from "../../universal-styles";
import ColorPreview from "./ColorPreview";
import ClipboardInput from "./ClipboardInput";
import ColorControl from "./ColorControl";
import Action from "./Action";
import Modal from "../../custom-html-components/Modal";

const RGB_MODE = "RGB";
const HEX_MODE = "HEX";
const RED_KEY = "red";
const GREEN_KEY = "green";
const BLUE_KEY = "blue";

class ColorPicker extends React.Component {
  constructor() {
    super();

    this._storeManager = new StoreManager();

    const mode = this._storeManager.mode;
    let colorString;
    if (mode === RGB_MODE) {
      colorString = this._storeManager.fullRGB;
    } else {
      colorString = this._storeManager.fullHEX;
    }

    this.state = {
      mode,
      colorString,
      previewColor: this._storeManager.fullHEX,
      red: this._storeManager.red,
      green: this._storeManager.green,
      blue: this._storeManager.blue,
    };

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      paddingBottom: "1em",
      width: "100%",
      maxWidth: "350px",
      border: `2px solid ${colors.colorPicker.color}`,
      borderRadius: "3px",
      backgroundColor: colors.colorPicker.backgroundColor,
      userSelect: "none",
    };

    this._tabItems = [
      {
        text: RGB_MODE,
        classes: [RGB_MODE],
        active: this._storeManager.mode === RGB_MODE,
        onClick: this._onTabClick.bind(this),
      },
      {
        text: HEX_MODE,
        classes: [HEX_MODE],
        active: this._storeManager.mode === HEX_MODE,
        onClick: this._onTabClick.bind(this),
      },
    ];
  }

  render() {
    return (
      <div id="color-picker" style={this._initStyles}>
        <TabBar tabItems={this._tabItems} />
        <ColorPreview color={this.state.previewColor} />
        <ColorControl
          sliderID={`${RED_KEY}-slider`}
          bg={RED_KEY}
          colorName={RED_KEY}
          value={this.state.red}
          mode={this.state.mode}
        />
        <ColorControl
          sliderID={`${GREEN_KEY}-slider`}
          bg={GREEN_KEY}
          colorName={GREEN_KEY}
          value={this.state.green}
          mode={this.state.mode}
        />
        <ColorControl
          sliderID={`${BLUE_KEY}-slider`}
          bg={BLUE_KEY}
          colorName={BLUE_KEY}
          value={this.state.blue}
          mode={this.state.mode}
        />
        <ClipboardInput value={this.state.colorString} text="Copy" />
        <Action
          text={"New Palette"}
          onClick={this._onNewPaletteActionClick.bind(this)}
        />
        <Action text={"Add To Palette"} />
        <Action text={"Add To Favorites"} />
      </div>
    );
  }

  componentDidMount() {
    const picker = this._rootEl();
    picker.addEventListener(
      "color-slider-changed",
      this._onColorSliderChanged.bind(this)
    );
    picker.addEventListener(
      "color-input-changed",
      this._onColorInputChanged.bind(this)
    );
    picker.addEventListener("color-copied", this._onColorCopied.bind(this));
  }

  _rootEl() {
    return document.getElementById("color-picker");
  }

  _onColorSliderChanged(event) {
    const { colorName, newValue } = event.detail;
    this._updateColorValue(colorName, newValue);
  }

  _onColorInputChanged(event) {
    const { colorName, value } = event.detail;
    const mode = this.state.mode;
    let newValue;
    if (mode === RGB_MODE && value.match(/^[0-9]{1,3}$/)) {
      newValue = parseInt(value);
    }
    if (mode === HEX_MODE && value.match(/^[0-9a-fA-F]{1,2}$/)) {
      newValue = parseInt(value, 16);
    }
    if (newValue !== undefined) {
      this._updateColorValue(colorName, newValue);
      return;
    }

    window.location.reload(false); // Hacky fix...
  }

  _onColorCopied() {
    this._showMessage("Color copied to clipboard!");
  }

  _onNewPaletteActionClick() {
    const message = "Enter a name for your new palette:";
    const onBlur = (event) => {
      const value = event.target.value;
      let valid = true;
      if (value.length === 0) valid = false;
      const palettes = this._storeManager.palettes;
      const found = palettes.filter((p) => {
        return p.name === value;
      });
      if (found.length > 0) valid = false;

      if (valid) {
        event.target.dispatchEvent(
          new CustomEvent("unlock", { bubbles: true })
        );
      } else {
        event.target.dispatchEvent(new CustomEvent("lock", { bubbles: true }));
      }
    };

    const onConfirm = (value) => {
      const newPalette = {
        name: value,
        colors: [],
      };
      this._storeManager.addPalette(newPalette);
      const message = `Palette '${value}' created!`;
      this._showMessage(message);
    };

    const modal = new Modal(message, onConfirm.bind(this), onBlur.bind(this));
    document.body.appendChild(modal);
  }

  _updateColorValue(colorName, newValue) {
    this._storeManager[colorName] = newValue;
    this.setState({
      [colorName]: newValue,
      previewColor: this._storeManager.fullHEX,
      colorString:
        this.state.mode === RGB_MODE
          ? this._storeManager.fullRGB
          : this._storeManager.fullHEX,
    });
  }

  _onTabClick(event) {
    const tab = event.target;
    if (tab.classList.contains("active")) return;
    if (tab.classList.contains(RGB_MODE)) {
      this._tabItems[0].active = true;
      this._tabItems[1].active = false;
      this._colorString = this._storeManager.fullRGB;
      this._switchToRGB();
    } else {
      this._tabItems[0].active = false;
      this._tabItems[1].active = true;
      this._colorString = this._storeManager.fullHEX;
      this._switchToHEX();
    }
  }

  _switchToHEX() {
    this._storeManager.mode = HEX_MODE;
    this.setState({
      mode: HEX_MODE,
      colorString: this._storeManager.fullHEX,
    });
  }

  _switchToRGB() {
    this._storeManager.mode = RGB_MODE;
    this.setState({
      mode: RGB_MODE,
      colorString: this._storeManager.fullRGB,
    });
  }

  _showMessage(text, error) {
    const picker = this._rootEl();
    let flashDiv = picker.querySelector(".flash");
    if (flashDiv) flashDiv.remove();
    flashDiv = document.createElement("div");
    flashDiv.classList.add("flash");
    flashDiv.textContent = text;
    applyStyles(flashDiv, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5em",
      margin: "0.5em 1em",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "3px",
    });
    if (error) {
      applyStyles(flashDiv, {
        ...colors.flashMessage.error,
      });
    } else {
      applyStyles(flashDiv, {
        ...colors.flashMessage.success,
      });
    }

    const firstAction = picker.querySelector(".action");
    picker.insertBefore(flashDiv, firstAction);

    setTimeout(() => {
      flashDiv.remove();
    }, 3000);
  }
}

export default ColorPicker;

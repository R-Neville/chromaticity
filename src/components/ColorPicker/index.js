import React from "react";
import colors from "../../colors";
import StoreManager from "../../StoreManager";
import TabBar from "../TabBar";
import universalStyles from "../../universal-styles";
import ColorPreview from "./ColorPreview";
import ClipboardInput from "./ClipboardInput";
import ColorControl from "./ColorControl";

const RGB_MODE = "RGB";
const HEX_MODE = "HEX";
const RED_KEY = "red";
const GREEN_KEY = "green";
const BLUE_KEY = "blue";

class ColorPicker extends React.Component {
  constructor() {
    super();

    this._storeManager = new StoreManager();

    let colorString;
    if (this._storeManager.mode === RGB_MODE) {
      colorString = this._storeManager.fullRGB;
    } else {
      colorString = this._storeManager.fullHEX;
    }

    this.state = {
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
        />
        <ColorControl
          sliderID={`${GREEN_KEY}-slider`}
          bg={GREEN_KEY}
          colorName={GREEN_KEY}
          value={this.state.green}
        />
        <ColorControl
          sliderID={`${BLUE_KEY}-slider`}
          bg={BLUE_KEY}
          colorName={BLUE_KEY}
          value={this.state.blue}
        />
        <ClipboardInput value={this.state.colorString} text="Copy" />
      </div>
    );
  }

  componentDidMount() {
    const picker = document.getElementById("picker");
    picker.addEventListener(
      "color-slider-changed",
      this._onColorSliderChanged.bind(this)
    );
  }

  _onColorSliderChanged(event) {
    const { colorName, newValue } = event.detail;
    this._storeManager[colorName] = newValue;
    this.setState({
      [colorName]: newValue,
      previewColor: this._storeManager.fullHEX,
      colorString:
        this._storeManager.mode === RGB_MODE
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
      colorString: this._storeManager.fullHEX,
    });
  }

  _switchToRGB() {
    this._storeManager.mode = RGB_MODE;
    this.setState({
      colorString: this._storeManager.fullRGB,
    });
  }
}

export default ColorPicker;

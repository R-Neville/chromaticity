import React from "react";
import colors from "../../colors";
import StoreManager from "../../StoreManager";
import TabBar from "../TabBar";
import universalStyles from "../../universal-styles";
import ColorPreview from "./ColorPreview";
import ClipboardInput from "./ClipboardInput";

const RGB_MODE = "RGB";
const HEX_MODE = "HEX";

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
      previewColor: this._storeManager.fullHEX
    };

    this._previewColor = this._storeManager.fullHEX;

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "350px",
      border: `2px solid ${colors.colorPicker.color}`,
      borderRadius: "3px",
      backgroundColor: colors.colorPicker.backgroundColor,
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
        <div style={{ padding: "0 1em", marginBottom: "1em" }}>
          <ClipboardInput key={this.state.colorString} value={this.state.colorString} text="Copy" />
        </div>
      </div>
    );
  }

  _onTabClick(event) {
    const tab = event.target;
    if (tab.classList.contains("active")) return;
    if (tab.classList.contains("RGB")) {
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
      colorString: this._storeManager.fullHEX
    });
  }

  _switchToRGB() {
    this._storeManager.mode = RGB_MODE;
    this.setState({
      colorString: this._storeManager.fullRGB
    });
  }
}

export default ColorPicker;

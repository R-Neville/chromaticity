import React from "react";
import colors from "../../colors";
import { applyStyles } from "../../helpers";
import StoreManager from "../../StoreManager";
import TabBar from "../TabBar";
import universalStyles from "../../universal-styles";

const RGB_MODE = 'RGB';
const HEX_MODE = 'HEX';

class ColorPicker extends React.Component {
  constructor() {
    super();

    this._storeManager = new StoreManager();

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      width: "100%",
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
      </div>
    );
  }

  _onTabClick(event) {
    const tab = event.target;
    if (tab.classList.contains('active')) return;
    const colorPicker = document.querySelector('#color-picker');
    const otherTab = colorPicker.querySelector('.tab.active');
    otherTab.classList.remove('active');
    applyStyles(otherTab, colors.tab.inactive);
    tab.classList.add('active');
    applyStyles(tab, colors.tab.active);
    if (tab.classList.contains('RGB')) {
      this._switchToHEX();
    } else {
      this._switchToRGB();
    }
  }

  _switchToHEX() {
    this._storeManager.mode = HEX_MODE;
  }

  _switchToRGB() {
    this._storeManager.mode = RGB_MODE;
  }
}

export default ColorPicker;

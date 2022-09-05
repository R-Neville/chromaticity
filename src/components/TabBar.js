import React from "react";
import colors from "../colors";
import universalStyles from "../universal-styles";
import Tab from "./Tab";

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      ...colors.tabBar,
    };
  }

  render() {
    const tabs = this.props.tabItems.map((ti, index) => {
      return (
        <Tab
          key={index}
          classes={ti.classes}
          active={ti.active}
          text={ti.text}
          onClick={ti.onClick}
        />
      );
    });

    return (
      <div className="tab-bar" style={this._initStyles}>
        {tabs}
      </div>
    );
  }
}

export default TabBar;

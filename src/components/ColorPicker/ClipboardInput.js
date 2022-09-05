import React from "react";
import colors from "../../colors";
import universalStyles from "../../universal-styles";
import ReadOnlyInput from "../ReadOnlyInput";

class ClipboardInput extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      height: "30px",
      border: `1px solid ${colors.clipbaordInput.color}`,
      borderRadius: "3px",
      margin: '0.5em 1em'
    };
  }

  render() {
    return (
      <div className="clipboard-input" style={this._initStyles}>
        <ReadOnlyInput value={this.props.value} />
        {this._buildCopyButton()}
      </div>
    );
  }

  _buildCopyButton() {
    return (
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          height: "100%",
          border: "none",
          backgroundColor: colors.clipbaordInput.color,
          color: colors.clipbaordInput.backgroundColor,
          cursor: "pointer",
          userSelect: "none",
        }}
        className="copy"
        onClick={this._onCopyButtonClick}
      >
        {this.props.text}
      </button>
    );
  }

  _onCopyButtonClick(event) {
    const parent = event.target.closest(".clipboard-input");
    const readOnlyInput = parent.querySelector(".read-only");
    readOnlyInput.select();
    readOnlyInput.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(readOnlyInput.value);
    parent.dispatchEvent(new CustomEvent('color-copied', { bubbles: true }));
    console.log("copy");
  }
}

export default ClipboardInput;

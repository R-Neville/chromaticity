import React from "react";
import universalStyles from "../universal-styles";

class Page extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
      width: "100%",
      maxWidth: "700px",
      height: "100%",
      margin: "auto",
    };
  }

  render() {
    return (
      <div
        id={this.props.rootId}
        className="page"
        style={{ display: this.props.display, ...this._initStyles }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Page;

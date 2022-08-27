import React from "react";

class Page extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      flexDirection: "column",
      width: "100%",
      height: "100%",
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

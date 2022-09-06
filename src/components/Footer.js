import React from "react";
import colors from "../colors";
import universalStyles from "../universal-styles";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
      backgroundColor: colors.app.backgroundColor,
      color: colors.app.color,
    };
  }

  render() {
    return (
      <footer style={this._initStyles}>
        <img alt="logo" src="./logo-footer.svg" height="200px" />
        <p style={{ ...universalStyles, margin: "1em auto" }}>
          &copy; <a href="https://github.com/R-Neville">Robbie Neville</a>, 2022
        </p>
      </footer>
    );
  }
}

export default Footer;

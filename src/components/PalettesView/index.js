import React from "react";
import universalStyles from "../../universal-styles";
import colors from "../../colors";
import PaletteCard from "./PaletteCard";

class PalettesView extends React.Component {
  constructor(props) {
    super(props);

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      justifyContent: 'center',
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      borderRadius: "3px",
    };
  }

  render() {
    const paletteCards = this.props.palettes.map((p, index) => {
      return <PaletteCard key={index} name={p.name} colors={p.colors} />;
    });

    const noPalettes = (
      <div
        className="no-palettes"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em",
          margin: "auto",
        }}
      >
        <p style={{ fontSize: "1em", textAlign: "center" }}>
          You haven't created any palettes yet.
        </p>
        <button
          style={{
            padding: "0.5em 1em",
            border: "none",
            borderRadius: "3px",
            outline: "none",
            backgroundColor: colors.app.color,
            fontSize: "1em",
            color: colors.app.backgroundColor,
            cursor: "pointer",
          }}
          onClick={this._onNewPaletteButtonClick}
        >
          Create one!
        </button>
      </div>
    );

    return (
      <div id="palette-view" style={this._initStyles}>
        {paletteCards.length > 0 ? paletteCards : noPalettes}
      </div>
    );
  }

  _onNewPaletteButtonClick(event) {
    console.log("New palette");
  }
}

export default PalettesView;

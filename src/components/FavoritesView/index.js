import React from "react";
import universalStyles from "../../universal-styles";
import ColorCard from "./ColorCard";

class FavoritesView extends React.Component {
  constructor(props) {
    super(props);

    this._id = "favorites-view";

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      borderRadius: "3px",
    };
  }

  render() {
    const noFavorites = (
      <div
        style={{
          ...universalStyles,
          width: "100%",
          textAlign: "center",
          fontSize: "1em",
        }}
      >
        You don't have any favorites yet.
      </div>
    );
    const favoritesCount = (
      <div
        style={{
          ...universalStyles,
          width: "100%",
          textAlign: "center",
          fontSize: "1em",
        }}
      >
        You have {this.props.favorites.length} favorite
        {this.props.favorites.length !== 1 && "s"}.
      </div>
    );

    const colorCards = this.props.favorites.map((color) => {
      return <ColorCard key={color} color={color} />;
    });

    return (
      <div id={this._id} style={this._initStyles}>
        {colorCards.length === 0 && noFavorites}
        {colorCards.length > 0 && favoritesCount}
        {colorCards.length > 0 && colorCards}
      </div>
    );
  }

  _rootEl() {
    return document.getElementById(this._id);
  }
}

export default FavoritesView;

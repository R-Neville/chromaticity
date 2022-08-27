import React from "react";
import { applyStyles } from "./helpers";
import colors from "./colors";
import Header from "./components/Header";
import Page from "./components/Page";
import ColorPicker from "./components/ColorPicker";
import universalStyles from "./universal-styles";

class App extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      padding: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      fontSize: "1em",
      fontFamily: "Arial",
      ...colors.app,
    };

    this._linkItems = [
      {
        active: true,
        href: "#picker",
        text: "picker",
        onClick: this._onPickerLinkClick,
      },
      {
        active: false,
        href: "#palettes",
        text: "palettes",
        onClick: this._onPickerLinkClick,
      },
      {
        active: false,
        href: "#favorites",
        text: "favorites",
        onClick: this._onPickerLinkClick,
      },
    ];

    this._activeLinkStyles = {};
  }

  render() {
    return (
      <div style={this._initStyles}>
        <Header linkItems={this._linkItems} />
        <main>
          <Page 
            rootId={"picker"} 
            display={"flex"} 
            children={this._buildPickerPage()} 
          />
          <Page
            rootId={"palettes"}
            display={"none"}
            children={this._buildPalettesPage()}
          />
          <Page
            rootId={"favorites"}
            display={"none"}
            children={this._buildFavoritesPage()}
          />
        </main>
      </div>
    );
  }

  _onPickerLinkClick(event) {
    const anchor = event.target;
    const pageId = anchor.href.split("/").pop();
    const page = document.querySelector(pageId);
    if (page.style.display !== "none") return;
    const pages = document.querySelectorAll(".page");
    pages.forEach((p) => {
      if (p.id !== pageId) {
        applyStyles(p, { display: "none" });
      }
    });
    applyStyles(page, { display: "flex" });
    const activeAnchor = document.querySelector(".nav-link.active");
    if (activeAnchor) activeAnchor.classList.remove("active");
    applyStyles(activeAnchor, colors.navLink.inactive);
    anchor.classList.add("active");
  }

  _buildPickerPage() {
    return (
      <ColorPicker/>
    );
  }

  _buildPalettesPage() {
    return (
      <h1>palettes</h1>
    );
  }

  _buildFavoritesPage() {
    return (
      <h1>favorites</h1>
    );
  }
}

export default App;

import React from "react";
import { applyStyles } from "./helpers";
import colors from "./colors";
import Header from "./components/Header";
import Page from "./components/Page";
import ColorPicker from "./components/ColorPicker";
import universalStyles from "./universal-styles";
import PalettesView from "./components/PalettesView";
import StoreManager from "./StoreManager";
import Modal from "./custom-html-components/Modal";

class App extends React.Component {
  constructor() {
    super();

    this._storeManager = new StoreManager();

    this._initStyles = {
      ...universalStyles,
      display: "flex",
      flexDirection: "column",
      padding: 0,
      width: "100%",
      height: "100vg",
      minHeight: "100vh",
      margin: 0,
      fontSize: "1em",
      ...colors.app,
    };

    this._linkItems = [
      {
        active: true,
        text: "picker",
        onClick: this._onHeaderLinkClick.bind(this),
      },
      {
        active: false,
        text: "palettes",
        onClick: this._onHeaderLinkClick.bind(this),
      },
      {
        active: false,
        text: "favorites",
        onClick: this._onHeaderLinkClick.bind(this),
      },
    ];

    this._activeLinkStyles = {};

    this.state = {
      palettes: this._storeManager.palettes,
      linkItems: this._linkItems
    };
  }

  componentDidMount() {
    const appHeading = document.querySelector("header h1");
    if (window.innerWidth < 580) {
      appHeading.style.display = "none";
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 580) {
        appHeading.style.display = "none";
      } else {
        appHeading.style.display = "block";
      }
    });

    document.addEventListener(
      "new-palette-requested",
      this._onNewPaletteRequested.bind(this)
    );

    document.addEventListener(
      "delete-palette-requested",
      this._onDeletePaletteRequested.bind(this)
    )
  }

  render() {
    return (
      <div id="app" style={this._initStyles}>
        <Header linkItems={this.state.linkItems} />
        <main style={{ flexGrow: 1 }}>
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

  _rootEl() {
    return document.getElementById("app");
  }

  _onHeaderLinkClick(event) {
    const link = event.target;
    const pageId = link.textContent;
    const page = document.getElementById(pageId);
    if (page.style.display !== "none") return;
    const pages = document.querySelectorAll(".page");
    pages.forEach((p) => {
      if (p.id !== pageId) {
        applyStyles(p, { display: "none" });
      }
    });
    applyStyles(page, { display: "flex" });
    this._linkItems.forEach((li) => {
      if (li.text === pageId) {
        li.active = true;
      } else {
        li.active = false;
      }
    });
    this.setState({
      linkItems: this._linkItems
    })
  }

  _onNewPaletteRequested(event) {
    const message = "Enter a name for your new palette:";
    let modal = document.querySelector('custom-modal');
    if (modal) modal.remove();
    modal = new Modal(message);
    modal.addInput(onInput.bind(this));
    modal.addAction("Cancel", () => {
      modal.remove();
    });
    modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(modal);

    function onConfirm() {
      if (modal.valid) {
        const newPalette = {
          name: modal.inputValue,
          colors: [],
        };
        this._storeManager.addPalette(newPalette);
        this.setState({
          palettes: this._storeManager.palettes,
        });
        modal.remove();
        const message = `Palette '${modal.inputValue}' created!`;
        this._showMessage(message);
      }
    }

    function onInput(event) {
      const value = event.target.value;
      let valid = true;
      if (value.length === 0) valid = false;
      const palettes = this._storeManager.palettes;
      const found = palettes.filter((p) => {
        return p.name === value;
      });
      if (found.length > 0) valid = false;

      if (valid) {
        event.target.dispatchEvent(
          new CustomEvent("unlock", { bubbles: true })
        );
      } else {
        event.target.dispatchEvent(new CustomEvent("lock", { bubbles: true }));
      }
    }
  }

  _onDeletePaletteRequested(event) {
    const { name } = event.detail;
    this._storeManager.deletePalette(name);
    this.setState({
      palettes: this._storeManager.palettes
    });
  }

  _buildPickerPage() {
    return <ColorPicker />;
  }

  _buildPalettesPage() {
    return <PalettesView palettes={this.state.palettes} />;
  }

  _buildFavoritesPage() {
    return <h1>favorites</h1>;
  }

  _showMessage(text, error) {
    let flashDiv = document.querySelector(".flash");
    if (flashDiv) flashDiv.remove();
    flashDiv = document.createElement("div");
    flashDiv.classList.add("flash");
    flashDiv.textContent = text;
    applyStyles(flashDiv, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5em",
      width: "100%",
      maxWidth: "500px",
      margin: "1em auto",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "3px",
    });
    if (error) {
      applyStyles(flashDiv, {
        ...colors.flashMessage.error,
      });
    } else {
      applyStyles(flashDiv, {
        ...colors.flashMessage.success,
      });
    }

    const main = document.querySelector("main");
    this._rootEl().insertBefore(flashDiv, main);

    setTimeout(() => {
      flashDiv.remove();
    }, 3000);
  }
}

export default App;

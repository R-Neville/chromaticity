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
import Footer from "./components/Footer";

const PICKER = "picker";
const PALETTES = "palettes";
const FAVORITES = "favorites";

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
        text: PICKER,
        onClick: this._onHeaderLinkClick.bind(this),
      },
      {
        active: false,
        text: PALETTES,
        onClick: this._onHeaderLinkClick.bind(this),
      },
      {
        active: false,
        text: FAVORITES,
        onClick: this._onHeaderLinkClick.bind(this),
      },
    ];

    this._activeLinkStyles = {};

    this.state = {
      palettes: this._storeManager.palettes,
      linkItems: this._linkItems,
      page: PICKER
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
        appHeading.style.display = "flex";
      }
    });

    document.addEventListener(
      "new-palette-requested",
      this._onNewPaletteRequested.bind(this)
    );

    document.addEventListener(
      "delete-palette-requested",
      this._onDeletePaletteRequested.bind(this)
    );

    document.addEventListener(
      "rename-palette-requested",
      this._onRenamePaletteRequested.bind(this)
    );
  }

  render() {
    return (
      <div id="app" style={this._initStyles}>
        <Header linkItems={this.state.linkItems} />
        <main style={{ ...universalStyles, flexGrow: 1 }}>
          <Page
            rootId={PICKER}
            display={this.state.page === PICKER ? "flex" : "none"}
            children={this._buildPickerPage()}
          />
          <Page
            rootId={PALETTES}
            display={this.state.page === PALETTES ? "flex" : "none"}
            children={this._buildPalettesPage()}
          />
          <Page
            rootId={FAVORITES}
            display={this.state.page === FAVORITES ? "flex" : "none"}
            children={this._buildFavoritesPage()}
          />
        </main>
        <Footer />
      </div>
    );
  }

  _rootEl() {
    return document.getElementById("app");
  }

  _onHeaderLinkClick(event) {
    const link = event.target;
    const pageId = link.textContent;
    this.setState({
      page: pageId
    })
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
    let modal = document.querySelector('custom-modal');
    if (modal) modal.remove();
    const message = "Enter a name for your new palette:";
    modal = new Modal(message);
    modal.addInput(onInput.bind(this));
    modal.addAction("Cancel", () => {
      modal.remove();
    });
    modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(modal);

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
  }

  _onDeletePaletteRequested(event) {
    const { name } = event.detail;
    this._storeManager.deletePalette(name);
    this.setState({
      palettes: this._storeManager.palettes
    });
    const message = `Palette '${name}' deleted!`;
    this._showMessage(message);
  }

  _onRenamePaletteRequested(event) {
    const { oldName } = event.detail;
    let modal = document.querySelector('custom-modal');
    if (modal) modal.remove();
    const message = `Enter a new name for your palette:`;
    modal = new Modal(message);
    modal.addInput(onInput.bind(this), oldName);
    modal.addAction("Cancel", () => {
      modal.remove();
    });
    modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(modal);
  
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

    function onConfirm() {
      if (modal.valid) {
        this._storeManager.renamePalette(oldName, modal.inputValue);
        this.setState({
          palettes: this._storeManager.palettes,
        });
        modal.remove();
        const message = `Palette '${oldName}' renamed to '${modal.inputValue}'!`;
        this._showMessage(message);
      }
    }
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

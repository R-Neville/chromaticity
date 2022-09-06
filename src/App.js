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
import PaletteView from "./custom-html-components/PaletteView";

const PICKER = "picker";
const PALETTES = "palettes";
const FAVORITES = "favorites";

class App extends React.Component {
  constructor() {
    super();

    this._storeManager = new StoreManager();
    this._modal = null;
    this._paletteView = null;

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

    document.addEventListener(
      "add-color-to-palette-requested",
      this._onAddColorToPaletteRequested.bind(this)
    );

    document.addEventListener(
      "view-palette-requested",
      this._onViewPaletteRequested.bind(this)
    );

    document.addEventListener(
      "close-palette-view",
      this._removePaletteView.bind(this)
    );

    document.addEventListener(
      "remove-color-from-palette-requested",
      this._onRemoveColorFromPaletteRequested.bind(this)
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
    event.stopImmediatePropagation();
    this._removeModal();
    const message = "Enter a name for your new palette:";
    this._modal = new Modal(message);
    this._modal.addInput(onInput.bind(this));
    this._modal.addAction("Cancel", () => {
      this._removeModal();
    });
    this._modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(this._modal);

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
      if (this._modal.valid) {
        const newPalette = {
          name: this._modal.inputValue,
          colors: [],
        };
        this._storeManager.addPalette(newPalette);
        this.setState({
          palettes: this._storeManager.palettes,
        });
        const message = `Palette '${this._modal.inputValue}' created!`;
        this._removeModal();
        this._showMessage(message);
      }
    }
  }

  _onDeletePaletteRequested(event) {
    event.stopImmediatePropagation();
    const { name } = event.detail;
    this._storeManager.deletePalette(name);
    this.setState({
      palettes: this._storeManager.palettes
    });
    const message = `Palette '${name}' deleted!`;
    this._showMessage(message);
  }

  _onRenamePaletteRequested(event) {
    event.stopImmediatePropagation();
    const { oldName } = event.detail;
    this._removeModal();
    const message = `Enter a new name for your palette:`;
    this._modal = new Modal(message);
    this._modal.addInput(onInput.bind(this), oldName);
    this._modal.addAction("Cancel", () => {
      this._removeModal();
    });
    this._modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(this._modal);
  
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
      if (this._modal.valid) {
        this._storeManager.renamePalette(oldName, this._modal.inputValue);
        this.setState({
          palettes: this._storeManager.palettes,
        });
        const message = `Palette '${oldName}' renamed to '${this._modal.inputValue}'!`;
        this._removeModal()
        this._showMessage(message);
      }
    }
  }

  _onAddColorToPaletteRequested(event) {
    event.stopImmediatePropagation();
    const { colorHEX } = event.detail;
    this._removeModal();
    const message = "Pick a palette!";
    this._modal = new Modal(message);
    this._modal.addSelector(this.state.palettes.map(p => p.name));
    this._modal.addAction("Cancel", () => {
      this._removeModal();
    });
    this._modal.addAction("Confirm", onConfirm.bind(this));
    document.body.appendChild(this._modal);

    function onConfirm() {
      if (this._modal.valid) {
        this._storeManager.addColorToPalette(colorHEX, this._modal.selection);
        this.setState({
          palettes: this._storeManager.palettes
        });
        const message = `'${colorHEX}' added to '${this._modal.selection}!`;
        this._removeModal();
        this._showMessage(message);
      }
    }
  }

  _onViewPaletteRequested(event) {
    event.stopImmediatePropagation();
    const { name } = event.detail;
    this._removePaletteView();
    const palette = this.state.palettes.filter(p => p.name === name)[0];
    if (palette) {
      this._paletteView = new PaletteView(palette);
      document.body.appendChild(this._paletteView);
    }
  }

  _onRemoveColorFromPaletteRequested(event) {
    event.stopImmediatePropagation();
    const { color, palette } = event.detail;
    const updatedPalette = this._storeManager.removeColorFromPalette(color, palette);
    this.setState({
      palettes: this._storeManager.palettes
    });
    if (this._paletteView) {
      this._paletteView.update(updatedPalette);
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

  _removeModal() {
    if (this._modal) {
      this._modal.remove();
      this._modal = null;
    }
  }

  _removePaletteView() {
    if (this._paletteView) {
      this._paletteView.remove();
      this._paletteView = null;
    }
  }
}

export default App;

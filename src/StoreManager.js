const MODE_KEY = "mode";
const RED_KEY = "red";
const GREEN_KEY = "green";
const BLUE_KEY = "blue";
const PALETTES_KEY = "palettes";

export default class StoreManager {
  constructor() {
    if (!this.mode) this.mode = "RGB";
    if (!this.red) this.red = 0;
    if (!this.green) this.green = 0;
    if (!this.blue) this.blue = 0;
    if (!this.palettes) this.palettes = [];
  }

  get mode() {
    return window.localStorage.getItem(MODE_KEY);
  }

  set mode(value) {
    window.localStorage.setItem(MODE_KEY, value);
  }

  get red() {
    return parseInt(window.localStorage.getItem(RED_KEY));
  }

  set red(value) {
    window.localStorage.setItem(RED_KEY, value);
  }

  get redHEX() {
    return hexStringFromInt(this.red);
  }

  get green() {
    return parseInt(window.localStorage.getItem(GREEN_KEY));
  }

  set green(value) {
    window.localStorage.setItem(GREEN_KEY, value);
  }

  get greenHEX() {
    return hexStringFromInt(this.green);
  }

  get blue() {
    return parseInt(window.localStorage.getItem(BLUE_KEY));
  }

  set blue(value) {
    window.localStorage.setItem(BLUE_KEY, value);
  }

  get blueHEX() {
    return hexStringFromInt(this.blue);
  }

  get fullRGB() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  get fullHEX() {
    return `#${this.redHEX}${this.greenHEX}${this.blueHEX}`;
  }

  get palettes() {
    return JSON.parse(window.localStorage.getItem(PALETTES_KEY));
  }

  set palettes(newValue) {
    window.localStorage.setItem(PALETTES_KEY, JSON.stringify(newValue));
  }

  addPalette(newPalette) {
    const palettes = this.palettes;
    palettes.push(newPalette);
    this.palettes = palettes;
  }

  deletePalette(name) {
    const palettes = this.palettes;
    const found = palettes.filter(p => p.name === name);
    if (found.length > 0) {
      palettes.splice(palettes.indexOf(found[0]), 1);
      this.palettes = palettes;
    }
  }

  renamePalette(oldName, newName) {
    const palettes = this.palettes;
    palettes.forEach(p => {
      if (p.name === oldName) {
        p.name = newName;
      }
    });
    this.palettes = palettes;
  }

  addColorToPalette(color, paletteName) {
    const palettes = this.palettes;
    palettes.forEach(p => {
      if (p.name === paletteName && !p.colors.includes(color)) {
        p.colors.push(color);
      }
    });
    this.palettes = palettes;
  }

  removeColorFromPalette(color, paletteName) {
    const palettes = this.palettes;
    const palette = palettes.filter(p => p.name === paletteName)[0];
    palette.colors.splice(palette.colors.indexOf(color), 1);
    palettes.splice(palettes.indexOf(palette), 1, palette);
    this.palettes = palettes;
    return palette;
  }
}

function hexStringFromInt(int) {
  const hexString = int.toString(16);
  return (hexString.length === 1 ? "0" + hexString : hexString).toUpperCase();
}

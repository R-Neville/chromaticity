const MODE_KEY = 'mode';
const RED_KEY = 'red';
const GREEN_KEY = 'green';
const BLUE_KEY = 'blue';

export default class StoreManager {
  constructor() {
    if (!this.mode) this.mode = "RGB";
    if (!this.red) this.red = 0;
    if (!this.green) this.green = 0;
    if (!this.blue) this.blue = 0;
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
}

function hexStringFromInt(int) {
  const hexString = int.toString(16);
  return hexString.length === 1 ? "0" + hexString : hexString;
}

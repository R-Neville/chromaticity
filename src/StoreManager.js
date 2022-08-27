export default class StoreManager {
  constructor() {
    if (!this.mode) this.mode = 'RGB';
    if (!this.red) this.red = 0;
    if (!this.green) this.green = 0;
    if (!this.blue) this.blue = 0;
  }

  get mode() {
    return window.localStorage.getItem('mode');
  }

  set mode(value) {
    window.localStorage.setItem('mode', value);
  }

  get red() {
    return window.localStorage.getItem('red');
  }

  set red(value) {
    window.localStorage.setItem('red', value);
  }

  get green() {
    return window.localStorage.getItem('green');
  }

  set green(value) {
    window.localStorage.setItem('gree', value);
  }

  get blue() {
    return window.localStorage.getItem('blue');
  }

  set blue(value) {
    window.localStorage.setItem('blue', value);
  }
}
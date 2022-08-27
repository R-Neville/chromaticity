export function applyStyles(element, styles) {
  for (let style in styles) {
    if (element.style[style] !== undefined) {
      element.style[style] = styles[style];
    }
  }
}
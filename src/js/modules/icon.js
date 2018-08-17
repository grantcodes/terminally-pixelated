const url = TerminallyPixelated.svg_icon_url

export default icon =>
  icon
    ? `<svg class="tp-icon tp-icon--${icon}"><use xlink:href="${url}#${icon}"></use></svg>`
    : ''

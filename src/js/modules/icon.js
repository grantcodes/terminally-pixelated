var url = TerminallyPixelated.svg_icon_url;

module.exports = function(icon) {
    if (icon) {
        return '<svg class="tp-icon tp-icon--' + icon + '"><use xlink:href="' + url + '#' + icon + '"></use></svg>';
    } else {
        return '';
    }
};

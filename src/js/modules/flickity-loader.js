var Flickity = require('flickity-imagesloaded');

module.exports = function(options) {

    var settings = {
        selector: '.slider',
        pageDots: false,
        wrapAround: true,
        imagesLoaded: true,
        contain: true,
        cellAlign: 'left',
    };

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            settings[key] = options[key];
        }
    }

    var selector = settings.selector;
    delete settings.selector;

    var sliders = document.querySelectorAll(selector);
    if (sliders && sliders.length > 0) {
        for (var i = sliders.length - 1; i >= 0; i--) {
            var slider = sliders[i];
            new Flickity(slider, settings);
        }
    }
};

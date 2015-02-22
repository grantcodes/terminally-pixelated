# Terminally Pixelated

Terminally Pixelated is a timber based WordPress starter theme with some grunt and Sass niceties.

Developed by [Terminal Pixel](http://www.terminalpixel.co.uk/)

## What's in the box?

Terminally Pixelated comes jam packed full of greatness:

- Timber for superior WordPress templating
- Auto css compression & optimisation
- Magical font sizing with modular scale
- The scut scss library to help you develop faster
- Loosely follows the block, element, modifier methodology
- Susy for super semantic grids
- Formstone components for easy JavaScript development
- Favicon creation via grunt-favicons
- A shared config that is accessible via Sass, PHP and JavaScript
- Automatic style guide creation

## Getting started

To get started, download however you wish and edit terminally-pixelated.json with your development url then run `npm install`, `grunt build` in the theme directory to install the required grunt and bower modules and move them to the appropriate location.

Run `grunt` in the theme directory to watch for file changes and start a live reload server.

Run `grunt build` to fully compile your theme.

## Diving in

### Font sizing

Font sizing is easiest to achieve using the `tp-fs` mixin.

    @include tp-fs(1);

This will create a font size one level up your scale using `rems` with a `px` fallback;

### Spacing

Spacing is best done with the `tp-space` mixin which creates a value based off of your base font size;

    @include tp-space(padding-bottom, .5);

This will create `padding-bottom` on an element with the value of half of your base line height.

There is also `tp-leader`, `tp-trailer`, `tp-padding-leader` and `tp-padding-trailer` to easily add vertical margins and paddings.

## Requirements

There are a few dependencies required to build with Terminally Pixelated:

- NodeJS with some global packages:
- - bower
- - grunt
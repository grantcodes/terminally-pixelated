# Terminally Pixelated

Terminally Pixelated is a timber based WordPress starter theme with some grunt and Sass niceties.

Developed by [Terminal Pixel](http://www.terminalpixel.co.uk/)

## What's in the box?

Terminally Pixelated comes jam packed full of greatness:

- Timber for superior WordPress templating
- Auto css compression & optimisation
- Magical font sizing with modular scale & typecsset
- The scut scss library to help you develop faster
- Loosely follows the block, element, modifier methodology
- Susy for super semantic grids

## Getting started

To download however you wish and then run `npm install`, `bower install` and `grunt bowercopy` in the theme directory to install the required grunt and bower modules and move them to the appropriate location.

Run `grunt` in the theme directory to watch for file changes and start a live reload server.

You can also run `grunt build` to manually compile scss.

## Diving in

### Font sizing

Font sizing is easiest to achieve using the `tp-fs` mixin. It is a wrapper mixin that will pass modular scale value to typecsset

    @include tp-fs(1);

This will create a font size one level up your scale using `rems` with a `px` fallback;

### Spacing

Spacing is best done with the `typecsset-space` mixin which creates a value based off of your base font size;

    @include typecsset-space(padding-bottom, .5);

This will create `padding-bottom` on an element with the value of half of your base line height.

## Requirements

There are a few dependencies required to build with Terminally Pixelated:

- Ruby + Compass
- NodeJS with some global packages:
- - bower
- - grunt
- The WordPress timber-library plugin
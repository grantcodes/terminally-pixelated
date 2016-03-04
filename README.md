# Terminally Pixelated

Terminally Pixelated is a timber based WordPress starter theme with some gulp, Sass, composer and webpack niceties.

Developed by [Grant Richmond](http://grant.codes)

## What's in the box?

Terminally Pixelated comes jam packed full of greatness:

- Timber for superior WordPress templating
- Auto css compression & optimisation
- Magical font sizing
- The scut scss library to help you develop faster
- Loosely follows the block, element, modifier methodology
- Susy for super semantic grids
- A shared config that is accessible via Sass, PHP and JavaScript
- Automatic style guide creation
- Webpack for JavaScript bundling
- Browser sync for live reloading and development loveliness
- Composer support
- Flickity for beautiful sliders (beware of licenses with this)

## Getting started

To get started, download however you wish and edit `src/config.json` with your development url then run `npm install`, `composer install` and `gulp build` in the content directory to install the required dependencies.

Run `gulp watch` in the content directory to watch for file changes and start a browser sync server.

Run `gulp build` to fully compile your theme.

## Diving in

### Font sizing

Font sizing is easiest to achieve using the `tp-fs` mixin.

    @include tp-fs(1);

### Spacing

Spacing is best done with the `tp-space` mixin which creates a value based off of your base font size;

    @include tp-space(padding-bottom, .5);

This will create `padding-bottom` on an element with the value of half of your base line height.

There is also `tp-leader`, `tp-trailer`, `tp-padding-leader` and `tp-padding-trailer` to easily add vertical margins and paddings.

## Enqueuing resources

There is a little wrapper to be able to quickly register or enqueue JavaScript and CSS files from your theme:

	TPHelpers::register( 'js/app.js', array( 'jquery' ) );
	TPHelpers::enqueue( 'css/style.css' );

And an accompanying helper for getting the url of a theme resource:

	TPHelpers::get_theme_resource_uri( '/path/to/file.txt' );

## Svg icons

Svg files that are placed in the `src/svgs/` folder are automatically squashed into a single svg and retrieved via svg symbols.

To use an icon in a twig template you can simply use the `icon` function. For example to use an icon saved at `src/svgs/facebook.svg` you simply add `{{icon('facebook')}}` to your template at the appropriate point.

There is also a function to grab the html for an icon in PHP. The previous example would then become:

    $icon = TPHelpers::icon('facebook');

## Requirements

There are a couple of dependencies required to build with Terminally Pixelated:

- Gulp
- Composer

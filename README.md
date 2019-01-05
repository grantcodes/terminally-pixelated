# Terminally Pixelated

Terminally Pixelated is a highly opinionated WordPress development environment.

Everything is run via [Lando](https://devwithlando.io) so you will need that installed and set up to get started.

Note that the WordPress admin will be available at `/wp/wp-admin` instead of just `/wp-admin`.

Developed by [Grant Richmond](https://grant.codes)

## What's in the box?

Terminally Pixelated comes jam packed full of greatness:

- Lando for instant development server setup
- Timber for superior WordPress templating
- Auto css compression & optimisation
- Magical font sizing
- The scut scss library to help you develop faster
- Loosely follows the block, element, modifier methodology
- Susy for super semantic grids
- A shared config that is accessible via Sass, PHP and JavaScript
- Webpack for JavaScript bundling
- Browser sync for live reloading and development loveliness
- Composer support
- Photoswipe for nice image zooming
- .vscode project configuration files

## Getting started

To get started, download however you wish and edit `.lando.yml` with your project / theme folder name then run `lando start`, `lando watch` to get the show on the road with hot reloading and everything. You'll probably want to change the 'app/style.css' file as well to change the theme details.

To install more dependencies I recommend using `lando npm install` and `lando composer require` to keep everything inside of lando.

Run `lando build` to fully compile and compress everything.

## Known issues

- While running `lando watch` the WordPress admin area doesn't work perfectly. If you want to test the admin area you will need to run `lando build` first

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

## Photoswipe setup

My photoswipe example require a simple html setup with images in `a` tags with data attributes for the width and height of the full size image:

    <div class="gallery">
        <a href="{{image.src}}" data-width="{{image.width}}" data-height="{{image.height}}">
            <img src="{{image.src|resize(200,200)}}" alt="{{image.alt}}" />
        </a>
    </div>

## Requirements

You just need lando installed and set up and you're good to go!

## Deployment

When deploying a site you should first run `lando build`, then after that it all depends on your WordPress hosting setup.

You definitely shouldn't deploy the `.vscode`, `app`, `bin`, `src` or `tests` folders.

By default composer is set up to install WordPress into the `/wp` directory and has a `wp-config.php` file in the root directory that loads vendor files from `wp-content/vendor`

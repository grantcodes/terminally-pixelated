<?php
// Template Name: Style Guide
$context = Timber::get_context();
$context['post'] = Timber::get_post();
$context['main_sidebar'] = false;
$context['styleguide'] = file_get_contents( TPHelpers::get_theme_resource_uri( 'docs/styleguide/index.html' ) );
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style( 'highlight', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/tomorrow-night-bright.min.css' );
    wp_enqueue_script( 'highlight', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js', array( 'jquery' ), false, true );
    wp_enqueue_script( 'kss', TPHelpers::get_theme_resource_uri( 'docs/styleguide/public/kss.js' ), array( 'jquery', 'highlight' ), false, true );
} );
Timber::render( 'styleguide.twig', $context );
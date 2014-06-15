<?php
// Template Name: Style Guide
$context = Timber::get_context();
$context['post'] = Timber::get_post();
$context['main_sidebar'] = false;
$context['iframe'] = TPHelpers::get_theme_resource_uri( 'docs/styleguide/index.html' );
wp_enqueue_script( 'styleguide-iframe', TPHelpers::get_theme_resource_uri( 'js/styleguide-iframe.js' ), array( 'jquery' ), 1, true );
Timber::render( 'styleguide.twig', $context );
<?php
/**
 * The woocommerce template file
 * @package  terminally-pixelated
 */

$context = Timber::get_context();
ob_start();
woocommerce_content();
$context['woocommerce'] = ob_get_clean();
if ( ! is_singular() ) {
	$context['is_archive'] = true;
	$context['pagination'] = Timber::get_pagination();
}
if ( is_single() ) {
	$context['show_comments'] = true;
	$context['show_postmeta'] = true;
}
$context['main_sidebar'] = false;
Timber::render( 'woocommerce.twig', $context );

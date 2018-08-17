<?php
/**
 * The main template file
 *
 * @package terminally-pixelated
 */

$context          = Timber::get_context();
$context['posts'] = Timber::get_posts();
if ( ! is_singular() ) {
	$context['is_archive'] = true;
	$context['pagination'] = Timber::get_pagination();
} else {
	if ( 1 === count( $context['posts'] ) && $context['posts'][0]->thumbnail() ) {
		$image                   = $context['posts'][0]->thumbnail();
		$context['header_image'] = $image;
	}
}
if ( is_single() ) {
	$context['show_comments'] = true;
	$context['show_postmeta'] = true;
}
Timber::render( 'index.twig', $context );

<?php
/**
 * The 404 template file
 * @package  terminally-pixelated
 */

$context = Timber::get_context();
$context['title'] = 'Uh oh!';
Timber::render( '404.twig', $context );

<?php
$context = $GLOBALS['timberContext'];
if ( !isset( $context ) ) {
    throw new \Exception( 'Timber context not set in footer.' );
}
$context['content'] = ob_get_contents();
$context['main_sidebar'] = false;
ob_end_clean();
$templates = array( 'page-plugin.twig' );
Timber::render( $templates, $context );
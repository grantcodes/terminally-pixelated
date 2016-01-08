<?php
/**
 * Let's get this party started
 * @package  terminally-pixelated
 */

/**
 * A simple autoloader function to load our classes
 * @param  string  $class_name The class name.
 * @param  boolean $instantiate Should the class be instantiated or not.
 * @return object             The class or false if not exists
 */
function terminally_pixelated_autoload( $class_name, $instantiate = false ) {
	if ( file_exists( get_stylesheet_directory() . '/lib/' . $class_name . '.php' ) && ! class_exists( $class_name ) ) {
		require_once get_stylesheet_directory() . '/lib/' . $class_name . '.php';
		if ( $instantiate ) {
			return new $class_name;
		}
	} else {
		return false;
	}
}

terminally_pixelated_autoload( 'TPHelpers' );
terminally_pixelated_autoload( 'TerminallyPixelatedBase' );
terminally_pixelated_autoload( 'TerminallyPixelatedCustom', true );
terminally_pixelated_autoload( 'TerminallyPixelatedCustomizer', true );
terminally_pixelated_autoload( 'TerminallyPixelatedWoocommerce', true );
require_once( 'vendor/tha-theme-hooks.php' );
require_once( 'vendor/class-tgm-plugin-activation.php' );

<?php
/**
 * Let's get this party started
 *
 * @package terminally-pixelated
 */

/**
 * A simple autoloader function to load our classes
 *
 * @param  string  $class_name The class name.
 * @param  boolean $instantiate Should the class be instantiated or not.
 * @return object             The class or false if not exists
 */
function terminally_pixelated_autoload( $class_name, $instantiate = false ) {
	if ( file_exists( dirname( __FILE__ ) . '/lib/' . $class_name . '.php' ) && ! class_exists( $class_name ) ) {
		require_once dirname( __FILE__ ) . '/lib/' . $class_name . '.php';
		if ( $instantiate ) {
			return new $class_name();
		}
	} else {
		return false;
	}
}

terminally_pixelated_autoload( 'TPHelpers' );
terminally_pixelated_autoload( 'TerminallyPixelatedBase' );
terminally_pixelated_autoload( 'TerminallyPixelatedCustom', true );
terminally_pixelated_autoload( 'TerminallyPixelatedBlocks', true );
terminally_pixelated_autoload( 'TerminallyPixelatedCustomizer', true );
terminally_pixelated_autoload( 'TerminallyPixelatedWoocommerce', true );

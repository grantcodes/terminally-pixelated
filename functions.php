<?php

function terminally_pixelated_autoload( $class_name ) {
	if ( file_exists( get_stylesheet_directory() . '/lib/' . $class_name . '.php' ) && !class_exists( $class_name ) ) {
		require_once get_stylesheet_directory() . '/lib/' . $class_name . '.php';
		new $class_name;
	} else {
		return false;
	}
}
terminally_pixelated_autoload( 'TerminallyPixelatedBase' );

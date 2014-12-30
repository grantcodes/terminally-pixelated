<?php

function terminally_pixelated_autoload( $class_name ) {
	if ( file_exists( get_stylesheet_directory() . '/lib/' . $class_name . '.php' ) && !class_exists( $class_name ) ) {
		require_once get_stylesheet_directory() . '/lib/' . $class_name . '.php';
		new $class_name;
	} else {
		return false;
	}
}
terminally_pixelated_autoload( 'TPHelpers' );

if ( !class_exists( 'Timber' ) ) {
    if ( !is_admin() ) {
        echo 'Timber not activated. Make sure you activate the plugin in <a href="' . get_admin_url( get_current_blog_id(), 'plugins.php' ) . '">/wp-admin/plugins.php</a>';
    } else {
        add_action( 'admin_notices', array( 'TPHelpers', 'timber_activate_message' ) );
    }
} else {
    terminally_pixelated_autoload( 'TerminallyPixelatedBase' );
    terminally_pixelated_autoload( 'TerminallyPixelatedCustom' );
    terminally_pixelated_autoload( 'TerminallyPixelatedCustomizer' );
    terminally_pixelated_autoload( 'TerminallyPixelatedWoocommerce' );
}

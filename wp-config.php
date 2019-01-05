<?php
/**
 * This is a kind of intelligent WordPress config setup.
 * It will automatically work if you are running locally with lando, hosted on pantheon
 */
if ( $lando_json = getenv( 'LANDO_INFO' ) ) {
	$lando_info = json_decode( $lando_json );
	$lando_url = 'https://' . getenv('LANDO_APP_NAME') . '.' . getenv('LANDO_DOMAIN');
	define( 'DB_NAME', $lando_info->database->creds->database );
	define( 'DB_USER', $lando_info->database->creds->user );
	define( 'DB_PASSWORD', $lando_info->database->creds->password );
	define( 'DB_HOST', $lando_info->database->hostnames[0] );
	define( 'WP_HOME', $lando_url );
	define( 'WP_SITEURL', $lando_url . '/wp' );
	define( 'SAVEQUERIES', true );
	define( 'WP_DEBUG', true );
	define( 'SCRIPT_DEBUG', true );
} elseif ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	/**
 * Pantheon platform settings. Everything you need should already be set.
 */
	define( 'DB_NAME', $_ENV['DB_NAME'] );
	define( 'DB_USER', $_ENV['DB_USER'] );
	define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );
	define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );
	define( 'DB_CHARSET', 'utf8' );
	define( 'DB_COLLATE', '' );
	define( 'AUTH_KEY', $_ENV['AUTH_KEY'] );
	define( 'SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY'] );
	define( 'LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY'] );
	define( 'NONCE_KEY', $_ENV['NONCE_KEY'] );
	define( 'AUTH_SALT', $_ENV['AUTH_SALT'] );
	define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
	define( 'LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT'] );
	define( 'NONCE_SALT', $_ENV['NONCE_SALT'] );

	/* A couple extra tweaks to help things run well on Pantheon. */
	if ( isset( $_SERVER['HTTP_HOST'] ) ) {
		$scheme = 'http';
		if ( isset( $_SERVER['HTTP_USER_AGENT_HTTPS'] ) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON' ) {
			$scheme           = 'https';
			$_SERVER['HTTPS'] = 'on';
		}
		define( 'WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST'] );
		define( 'WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST'] );
	}
		error_reporting( E_ALL ^ E_DEPRECATED );
		define( 'WP_TEMP_DIR', $_SERVER['HOME'] . '/tmp' );
	if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'test', 'live' ) ) && ! defined( 'DISALLOW_FILE_MODS' ) ) {
		define( 'DISALLOW_FILE_MODS', true );
	}
} else {
	  /**
	 * This is the fallback config incase you are not using any of the hosting methods mentioned above.
	 */
	define( 'DB_NAME', 'database_name' );
	define( 'DB_USER', 'database_username' );
	define( 'DB_PASSWORD', 'database_password' );
	define( 'DB_HOST', 'database_host' );
	define( 'DB_CHARSET', 'utf8' );
	define( 'DB_COLLATE', '' );
	define( 'AUTH_KEY', 'put your unique phrase here' );
	define( 'SECURE_AUTH_KEY', 'put your unique phrase here' );
	define( 'LOGGED_IN_KEY', 'put your unique phrase here' );
	define( 'NONCE_KEY', 'put your unique phrase here' );
	define( 'AUTH_SALT', 'put your unique phrase here' );
	define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
	define( 'LOGGED_IN_SALT', 'put your unique phrase here' );
	define( 'NONCE_SALT', 'put your unique phrase here' );
	ini_set( 'display_errors', 0 );
	define( 'WP_DEBUG_DISPLAY', false );
	define( 'SCRIPT_DEBUG', false );
}

// Define the moved wp-content folder
define( 'WP_CONTENT_DIR', dirname(__FILE__) . '/wp-content' );
define( 'WP_CONTENT_URL', '/wp-content' );

// Autoload composer stuff.
// Note: If using a different setup the composer autoloader will need to be loaded from somewhere else.
require_once __DIR__ . '/wp-content/vendor/autoload.php';

/** Standard wp-config.php stuff from here on down. */

$table_prefix = 'wp_';

define( 'WPLANG', '' );
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy Pressing. */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
}
require_once ABSPATH . 'wp-settings.php';

<?php
/**
 * PHPUnit bootstrap file
 *
 * @package terminally-pixelated
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugins() {
	// Load the theme
	switch_theme( 'terminally-pixelated' );
	require_once dirname( __FILE__ ) . '/../themes/terminally-pixelated/functions.php';
	// Require the timber library.
	global $timber;
	require_once dirname( __FILE__ ) . '/../plugins/timber-library/timber.php';
	$timber = new \Timber\Timber(); // Newer version of timber.
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugins' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';

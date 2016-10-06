<?php
/**
 * Class TerminallyPixelatedBaseTests
 *
 * @package terminally-pixelated
 */

/**
 * Test the TerminallyPixelatedBase class.
 */
class TerminallyPixelatedBaseTests extends WP_UnitTestCase {

	/**
	 * Test that the correct theme is activated
	 */
	function test_active_theme() {
		$this->assertEquals( 'terminally-pixelated', wp_get_theme() );
		return;
	}

	/**
	 * Test the class exists
	 */
	function test_class_exists() {
		$class = new TerminallyPixelatedBase();
		$this->assertInstanceOf( 'TerminallyPixelatedBase', $class );
		return;
	}

	/**
	 * Test sidebars are registered
	 */
	function test_registered_sidebars() {
		$this->assertTrue( is_registered_sidebar( 'main-sidebar' ) );
		$footer_widget_count = TPHelpers::get_setting( 'footer-widgets' );
		for ( $i = 1; $i <= $footer_widget_count; $i++ ) {
			$this->assertTrue( is_registered_sidebar( 'footer-widgets-' . $i ) );
		}
	}

	/**
	 * Test scripts and styles are enqueued correctly
	 */
	function test_enqueued_resources() {
		do_action( 'wp_enqueue_scripts' );
		do_action( 'wp_enqueue_styles' );
		$this->assertTrue( wp_script_is( 'js/app.js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'style.css', 'enqueued' ) );
	}

	/**
	 * Test that menus are registered
	 */
	function test_registered_menus() {
		$menus = get_registered_nav_menus();
		$this->assertTrue( isset( $menus['main'] ) );
	}

	/**
	 * Test the default stuff is added to the timber context
	 */
	function test_timber_context() {
		$class = new TerminallyPixelatedBase;
		$context = $class->timber_context( array() );
		$this->assertTrue( is_array( $context['terminally_pixelated'] ) );
		$this->assertInstanceOf( 'Timber\Menu', $context['main_menu'] );
		$this->assertArrayHasKey( 'main_sidebar', $context );
		$this->assertArrayHasKey( 'svg_sprite', $context );
		$this->assertArrayHasKey( 'footer_text', $context );
	}
}

<?php
/**
 * Some extra bits and pieces to support woocommerce
 * @package  terminally-pixelated
 */

/**
 * WooCommerce functionality class
 */
class TerminallyPixelatedWoocommerce {

	/**
	 * Add theme support and hooks
	 */
	function __construct() {
		add_theme_support( 'woocommerce' );

		if ( function_exists( 'is_woocommerce' ) ) {
			add_filter( 'timber_context', array( $this, 'timber_context' ) );
			add_filter( 'woocommerce_enqueue_styles', array( $this, 'remove_styles' ) );
			// Remove pagination to use built in theme pagination.
			remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination' );
		}
	}

	/**
	 * Add WooCommerce specific context stuff here
	 * @param  array $context The timber context.
	 * @return array          Updated timber context
	 */
	function timber_context( $context ) {
		return $context;
	}

	/**
	 * Remove WooCommerce styles if you so wish
	 * @param  array $styles Default list of stylesheets to use.
	 * @return array         Updated list of styles to use
	 */
	function remove_styles( $styles ) {
		// unset( $styles['woocommerce-general'] );
		return $styles;
	}
}

<?php
/**
 * Some extra bits and pieces to support woocommerce
 */
class TerminallyPixelatedWoocommerce {

    function __construct() {
        add_theme_support( 'woocommerce' );

        if ( function_exists( 'is_woocommerce' ) ) {
            add_filter( 'timber_context', array( $this, 'timber_context' ) );
            add_filter( 'woocommerce_enqueue_styles', array( $this, 'remove_styles' ) );
            // Remove pagination to use built in theme pagination
            remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination' );
        }
    }

    function timber_context( $context ) {
        return $context;
    }

    function remove_styles( $styles ) {
        // unset( $styles['woocommerce-general'] );
        return $styles;
    }

}
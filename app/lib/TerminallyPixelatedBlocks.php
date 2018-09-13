<?php
/**
 * Serverside rendered blocks
 *
 * @package  terminally-pixelated
 */

/**
 * Blocks class
 */
class TerminallyPixelatedBlocks {

	/**
	 * Register the blocks
	 */
	function __construct() {
		register_block_type( 'terminally-pixelated/example-block', array(
			'render_callback' => array( $this, 'example_block' ),
		) );
	}

	/**
	 * An example block
	 *
	 * @param array $attributes Gutenberg block attributes.
	 * @return string Compiled block html
	 */
	function example_block( $attributes ) {
		return Timber::compile( 'components/example-block.twig', $attributes );
	}
}



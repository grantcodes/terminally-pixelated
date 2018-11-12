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
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type( 'terminally-pixelated/example-block', array(
				'render_callback' => array( $this, 'example_block' ),
			) );
			register_block_type( 'terminally-pixelated/latest-posts', array(
				'attributes'      => array(
					'categories'      => array(
						'type' => 'string',
					),
					'className'       => array(
						'type' => 'string',
					),
					'postsToShow'     => array(
						'type'    => 'number',
						'default' => 6,
					),
					'displayPostDate' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'postLayout'      => array(
						'type'    => 'string',
						'default' => 'grid',
					),
					'columns'         => array(
						'type'    => 'number',
						'default' => 3,
					),
					'align'           => array(
						'type' => 'string',
					),
					'order'           => array(
						'type'    => 'string',
						'default' => 'desc',
					),
					'orderBy'         => array(
						'type'    => 'string',
						'default' => 'date',
					),
				),
				'render_callback' => array( $this, 'latest_posts' ),
			) );
		}
	}

	/**
	 * An example block
	 *
	 * @param array $attributes Gutenberg block attributes.
	 * @return string Compiled block html
	 */
	function example_block( $attributes ) {
		return Timber::compile( 'blocks/example-block.twig', $attributes );
	}

	/**
	 * Latest posts block
	 *
	 * @param array $attributes Gutenberg block attributes.
	 * @return string Compiled block html
	 */
	function latest_posts( $attributes ) {
		$attributes['posts'] = Timber::get_posts(
			array(
				'numberposts' => $attributes['postsToShow'],
				'post_status' => 'publish',
				'order'       => $attributes['order'],
				'orderby'     => $attributes['orderBy'],
				'category'    => $attributes['categories'],
			)
		);
		$attributes['hide_postmeta'] = ! $attributes['displayPostDate'];
		return Timber::compile( 'blocks/latest-posts.twig', $attributes );
	}
}

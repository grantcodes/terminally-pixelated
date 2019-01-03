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
		add_filter( 'render_block', array( $this, 'remove_autop' ), 10, 2 );
	}


	/**
	 * Don't run wpautop on certain blocks
	 *
	 * @param string $block_content The block html string
	 * @param array $block The block info.
	 * @return void
	 */
	function remove_autop( $block_content, $block ) {
		if ( 'terminally-pixelated/latest-posts' === $block['blockName'] ) {
			remove_filter( 'the_content', 'wpautop' );
		}
		return $block_content;
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
				'numberposts' => isset( $attributes['postsToShow'] ) ? $attributes['postsToShow'] : null,
				'post_status' => 'publish',
				'order'       => isset( $attributes['order'] ) ? $attributes['order'] : null,
				'orderby'     => isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : null,
				'category'    => isset( $attributes['categories'] ) ? $attributes['categories'] : null,
			)
		);
		$attributes['hide_postmeta'] = ! $attributes['displayPostDate'];
		return Timber::compile( 'blocks/latest-posts.twig', $attributes );
	}
}

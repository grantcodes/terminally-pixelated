<?php
/**
 * Assemble the theme structure
 */
class TPStructure {

	function __construct() {
		add_action( 'terminally_pixelated_header', array( $this, 'title' ) );
		add_action( 'terminally_pixelated_loop', array( $this, 'article' ) );
		add_action( 'terminally_pixelated_before_content', array( $this, 'content_header' ) );
		add_action( 'terminally_pixelated_content', array( $this, 'content' ) );
		if ( is_archive() )
			add_action( 'terminally_pixelated_after_loop', array( $this, 'pagination' ) );
		add_action( 'terminally_pixelated_after_loop', 'comments_template' );
		add_action( 'terminally_pixelated_after_header', array( $this, 'nav' ) );
		add_action( 'terminally_pixelated_footer', array( $this, 'footer_widgets' ) );
		add_action( 'terminally_pixelated_footer', array( $this, 'footer_text' ) );
	}

	public static function assemble() {
		get_header();
		echo '<div class="content-sidebar-wrap">';
    get_template_part( 'templates/loop' );
		get_sidebar();
		echo '</div>';
		get_footer();
	}

	public static function title() {
		get_template_part( 'templates/title' );
	}

	public static function nav() {
		get_template_part( 'templates/nav' );
	}

	public static function article() {
		if( have_posts() ) {
		  while( have_posts() ) {
		  	the_post();
		    echo '<article ' . get_post_class() . ' role="article">';
	        do_action( 'terminally_pixelated_before_content' );
	        do_action( 'terminally_pixelated_content' );
	        do_action( 'terminally_pixelated_after_content' );
		    echo '</article>';
		  }
		} else {
	    echo '<article ';
	    post_class();
	    echo ' role="article">';
				echo '<p>No content found</p>';
	    echo '</article>';
		}
	}

	public static function footer_widgets() {
		get_template_part( 'templates/footer-widgets' );
	}

	public static function footer_text() {
		get_template_part( 'templates/footer-text' );
	}

	public static function content_header() {
		get_template_part( 'templates/parts/content-header' );
	}

	public static function content() {
		if ( is_archive() )
			the_excerpt();
		else
			the_content();
	}

	public static function pagination() {
		get_template_part( 'templates/parts/pagination' );
	}

}
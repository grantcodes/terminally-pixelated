<?php
/**
 * Some useful helper functions
 */
class TPHelpers {

	/**
	 * Returns the uri of a theme resource
	 * @param  string $resource relative resource uri with or without a starting /
	 * @return string           full resource uri
	 */
	public static function get_theme_resource_uri ( $resource ) {
		if ( '/' != substr( $resource, 0, 1 ) ) {
			$resource = '/' . $resource;
		}
		return get_stylesheet_directory_uri() . $resource;
	}

	/**
	 * Outputs an error message saying that timber needs to be activated
	 * @return null
	 */
	public static function timber_activate_message() {
		?>
		    <div class="error">
		        <p>You need to <a href="<?php echo get_admin_url( get_current_blog_id(), 'plugins.php' ) ?>">activate the timber plugin!</a></p>
		    </div>
		<?php
	}

}
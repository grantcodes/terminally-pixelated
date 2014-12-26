<?php
/**
 * Some useful helper functions
 */
class TPHelpers {

	static $json_settings = null;

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

	/**
	 * Gets a variable from the terminally-pixelated.json file
	 * @param  string  $key the variable to retrieve
	 * @return mixed   the value of the variable
	 */
	public static function get_setting( $key = false ) {
		if ( !self::$json_settings ) {
			$file = file_get_contents( get_stylesheet_directory() . '/terminally-pixelated.json' );
			self::$json_settings = (array) json_decode( $file );
		}
		if ( false === $key ) {
			return self::$json_settings;
		}
		elseif ( isset( self::$json_settings[$key] ) ) {
			return self::$json_settings[$key];
		}
		return false;
	}

}
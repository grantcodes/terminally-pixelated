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
	 * A wrapper function to more easily enqueue js and css
	 * @param  string  $resource the location of the file
	 * @param  array   $deps     the dependencies
	 * @return null              enqueues the file
	 */
	public static function enqueue( $resource, $deps = false ) {
		$uri = static::get_theme_resource_uri( $resource );
		if ( '/' == substr( $resource, 0, 1 ) ) {
			$resource = substr( $resource, 1 );
		}
		if ( strpos( $resource, '.js', strlen( $resource ) - 3 ) !== false ) {
			wp_enqueue_script( $resource, $uri, $deps, false, true );
		} elseif ( strpos( $resource, '.css', strlen( $resource ) - 4 ) !== false ) {
			wp_enqueue_style( $resource, $uri, $deps, false, false );
		}
	}

	/**
	 * A wrapper function to more easily register js and css
	 * @param  string  $resource the location of the file
	 * @param  array   $deps     the dependencies
	 * @return null              registers the file
	 */
	public static function register( $resource, $deps = false ) {
		$uri = static::get_theme_resource_uri( $resource );
		if ( '/' == substr( $resource, 0, 1 ) ) {
			$resource = substr( $resource, 1 );
		}
		if ( strpos( $resource, '.js', strlen( $resource ) - 3 ) !== false ) {
			wp_register_script( $resource, $uri, $deps, false, true );
		} elseif ( strpos( $resource, '.css', strlen( $resource ) - 4 ) !== false ) {
			wp_register_style( $resource, $uri, $deps, false, false );
		}
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
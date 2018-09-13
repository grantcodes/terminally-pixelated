<?php
/**
 * Some useful helper functions
 *
 * @package  terminally-pixelated
 */

/**
 * The helper class
 */
class TPHelpers {

	/**
	 * Cache of the json settings file
	 *
	 * @var null
	 */
	static $json_settings = null;

	/**
	 * Cache of the asset manifest file
	 */
	static $asset_manifest = array();

	/**
	 * Returns the uri of a theme resource
	 *
	 * @param  string $resource relative resource uri with or without a starting /.
	 * @return string           full resource uri
	 */
	public static function get_theme_resource_uri( $resource ) {
		if ( ! self::$asset_manifest ) {
			$file                 = file_get_contents( dirname( __FILE__ ) . '/../assets/manifest.json' );
			self::$asset_manifest = (array) json_decode( $file );
		}
		if ( isset( self::$asset_manifest[ $resource ] ) ) {
			return self::$asset_manifest[ $resource ];
		} else {
			if ( '/' !== substr( $resource, 0, 1 ) ) {
				$resource = '/' . $resource;
			}
			return get_stylesheet_directory_uri() . $resource;
		}
	}

	/**
	 * A wrapper function to more easily enqueue js and css
	 *
	 * @param  string $resource the location of the file.
	 * @param  array  $deps     the dependencies.
	 * @return void
	 */
	public static function enqueue( $resource, $deps = false ) {
		$uri = static::get_theme_resource_uri( $resource );
		if ( '/' === substr( $resource, 0, 1 ) ) {
			$resource = substr( $resource, 1 );
		}
		if ( strpos( $resource, '.js', strlen( $resource ) - 3 ) !== false ) {
			wp_enqueue_script( $resource, $uri, $deps, false, true );
		} elseif ( strpos( $resource, '.css', strlen( $resource ) - 4 ) !== false ) {
			wp_enqueue_style( $resource, $uri, $deps, false, 'all' );
		}
	}

	/**
	 * A wrapper function to more easily register js and css
	 *
	 * @param  string $resource the location of the file.
	 * @param  array  $deps     the dependencies.
	 * @return void
	 */
	public static function register( $resource, $deps = false ) {
		$uri = static::get_theme_resource_uri( $resource );
		if ( '/' === substr( $resource, 0, 1 ) ) {
			$resource = substr( $resource, 1 );
		}
		if ( strpos( $resource, '.js', strlen( $resource ) - 3 ) !== false ) {
			wp_register_script( $resource, $uri, $deps, false, true );
		} elseif ( strpos( $resource, '.css', strlen( $resource ) - 4 ) !== false ) {
			wp_register_style( $resource, $uri, $deps, false, false );
		}
	}

	/**
	 * Gets a variable from the config.json file
	 *
	 * @param  string $key the variable to retrieve.
	 * @return mixed  the value of the variable
	 */
	public static function get_setting( $key = false ) {
		if ( ! self::$json_settings ) {
			$file                = file_get_contents( dirname( __FILE__ ) . '/../config.json' );
			self::$json_settings = (array) json_decode( $file );
		}
		if ( false === $key ) {
			return self::$json_settings;
		} elseif ( isset( self::$json_settings[ $key ] ) ) {
			return self::$json_settings[ $key ];
		}
		return false;
	}

	/**
	 * Get svg markup for an icon
	 *
	 * @param  string $icon The icon to use.
	 * @param  string $svg  The url of the svg file.
	 * @return string       The svg markup
	 */
	public static function icon( $icon, $svg = false ) {
		if ( ! $svg ) {
			$svg = TPHelpers::get_theme_resource_uri( 'img/symbol/svg/sprite.symbol.svg' );
		}
		return '<svg class="tp-icon tp-icon--' . $icon . '"><use xlink:href="' . $svg . '#' . $icon . '"></use></svg>';
	}
}

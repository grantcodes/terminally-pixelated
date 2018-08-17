<?php
/**
 * Create theme customizer options
 *
 * @package  terminally-pixelated
 */

/**
 * Add settings to the customiser
 */
class TerminallyPixelatedCustomizer {

	/**
	 * Add hooks
	 */
	function __construct() {
		add_action( 'customize_register', array( $this, 'register' ) );
	}

	/**
	 * Register various things for the WordPress customiser
	 *
	 * @param  object $wp_customize The customizer object.
	 * @return void
	 */
	public static function register( $wp_customize ) {
		$wp_customize->add_section(
			'terminally_pixelated_settings', array(
				'title'       => 'Theme Settings',
				'priority'    => 35,
				'capability'  => 'edit_theme_options',
				'description' => 'Edit various theme settings',
			)
		);

		$wp_customize->add_setting(
			'terminally_pixelated_googleanalytics', array(
				'default'    => '',
				'type'       => 'option',
				'capability' => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'terminally_pixelated_googleanalytics',
				array(
					'label'    => 'Google Analytics ID',
					'section'  => 'terminally_pixelated_settings',
					'settings' => 'terminally_pixelated_googleanalytics',
				)
			)
		);

		$wp_customize->add_setting(
			'terminally_pixelated_footer_text', array(
				'default'    => '',
				'type'       => 'option',
				'capability' => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'terminally_pixelated_footer_text',
				array(
					'label'    => 'Footer Text',
					'section'  => 'terminally_pixelated_settings',
					'settings' => 'terminally_pixelated_footer_text',
				)
			)
		);
	}
}

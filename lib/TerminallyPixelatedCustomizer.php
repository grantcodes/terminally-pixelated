<?php
/**
 * Create theme customizer options
 */
class TerminallyPixelatedCustomizer {

    function __construct() {
        add_action( 'customize_register', array( $this, 'register' ) );
    }

    public static function register( $wp_customize ) {
        $wp_customize->add_section( 'terminally_pixelated_settings', array(
            'title' => 'Theme Settings',
            'priority' => 35,
            'capability' => 'edit_theme_options',
            'description' => 'Edit various theme settings'
        ) );

        $wp_customize->add_setting( 'terminally_pixelated_logo', array(
            'default' => '',
            'type' => 'theme_mod',
            'capability' => 'edit_theme_options',
        ) );

        $wp_customize->add_control(
            new WP_Customize_Image_Control(
                $wp_customize,
                'terminally_pixelated_logo',
                array(
                    'label'          => 'Logo',
                    'section'        => 'terminally_pixelated_settings',
                    'settings'       => 'terminally_pixelated_logo'
                )
            )
        );

        $wp_customize->add_setting( 'terminally_pixelated_googleanalytics', array(
            'default' => '',
            'type' => 'option',
            'capability' => 'edit_theme_options',
        ) );

        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'terminally_pixelated_googleanalytics',
                array(
                    'label'          => 'Google Analytics ID',
                    'section'        => 'terminally_pixelated_settings',
                    'settings'       => 'terminally_pixelated_googleanalytics'
                )
            )
        );
    }

}
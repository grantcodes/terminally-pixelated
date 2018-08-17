<?php
/**
 * Plugin Name: Terminally Pixelated Composer
 * Description: A helper mu-plugin for the loading composer dependencies
 * Plugin URI: http://terminalpixel.co.uk
 * Author: Grant Richmond
 * Version: 0.0.1
 * Author URI: http://grant.codes
 *
 * @package  terminally-pixelated
 */

$loader = require_once __DIR__ . '/terminally-pixelated/vendor/autoload.php';
$timber = new \Timber\Timber();

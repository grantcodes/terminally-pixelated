<nav class="main-nav" role="navigation">
    <?php wp_nav_menu( array( 
    	'theme_location'  => 'main',
		'container'       => false,
		'menu_class'      => 'menu',
		'fallback_cb'     => false,
		'depth'           => 2
		// 'before'          => '',
		// 'after'           => '',
		// 'link_before'     => '',
		// 'link_after'      => '',
    ) ); ?>
</nav>
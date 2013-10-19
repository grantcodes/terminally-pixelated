<?php if(have_posts()) : ?><?php while(have_posts()) : the_post(); ?>
	<article <?php post_class( ); ?> role="article">
	    <?php get_template_part( 'templates/loops/parts/before-content', 'thumbnail' ); ?>
	    <?php the_excerpt(); ?>
	    <?php get_template_part( 'templates/loops/parts/after-content' ); ?>
	</article>
<?php endwhile; endif; ?>
<?php get_template_part( 'templates/loops/parts/pagination' ); ?>
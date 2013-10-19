<?php if(have_posts()) : ?><?php while(have_posts()) : the_post(); ?>
	<article <?php post_class( ); ?> role="article">
	    <?php get_template_part( 'templates/loops/parts/before-content' ); ?>
	    <?php the_content(); ?>
	    <?php get_template_part( 'templates/loops/parts/after-content' ); ?>
	</article>
<?php endwhile; endif; ?>
<?php comments_template(); ?>
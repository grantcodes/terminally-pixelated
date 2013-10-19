<?php get_header(); ?>

    <main class="main-content" role="main">
        <?php get_template_part( 'templates/loops/archive' ); ?>
    </main>

    <aside class="main-aside" role="content">
        <?php get_sidebar() ?>
    </aside>

<?php get_footer(); ?>
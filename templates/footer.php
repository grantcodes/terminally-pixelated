<footer class="main-footer">
	<?php if ( TerminallyPixelatedBase::number_footer_widgets() ): ?>
		<section class="footer-widgets-wrapper">
			<?php for ($i=1; $i <= TerminallyPixelatedBase::number_footer_widgets(); $i++):
				$classes = 'footer-widgets footer-widgets-' . $i;
				if (TerminallyPixelatedBase::number_footer_widgets() == $i) {
					$classes .= ' footer-widgets-last';
				}
			?>
				<div class="<?php echo $classes; ?>">
					<?php if ( function_exists('dynamic_sidebar') ) {
						dynamic_sidebar('footer-widgets-' . $i);	
					} ?>
				</div>
			<?php endfor; ?>
		</section>
	<?php endif; ?>
	<section class="footer-text">
	    <p>Copyright <?php echo date('Y') . ' '; bloginfo('name'); ?> | All Rights Reserved.</p>
	</section>
</footer>
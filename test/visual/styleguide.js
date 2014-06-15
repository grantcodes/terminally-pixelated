casper.start('docs/styleguide/index.html')
.then(function() {
  phantomcss.screenshot('html', 'Styleguide Home');
});

casper.thenOpen('docs/styleguide/section-1.html')
.then(function() {
  phantomcss.screenshot('html', 'Styleguide Forms');
});
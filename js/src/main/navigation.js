(function($){

    if(TerminallyPixelated.classes.nav){
        var $nav = $('.' + TerminallyPixelated.classes.nav);
        $nav.navigation({
            labels: {
                closed: 'Menu',
                open: 'Close'
            },
            maxWidth: TerminallyPixelated['large-break']
        });
    }

})(jQuery);
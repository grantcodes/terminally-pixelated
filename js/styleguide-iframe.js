(function($){

    var styleguideIframe = {
        el: $('#styleguide-iframe'),

        getHeight: function() {
            return this.el.contents().find('#kss-main').outerHeight();
        },

        setHeight: function() {
            this.el.height(this.getHeight());
            this.el.css('overflow', 'hidden');
            this.el.attr('scrolling', 'no');
        }
    };

    styleguideIframe.el.load(function(){
        styleguideIframe.setHeight()
    });
    $(window).resize(function(){
        styleguideIframe.setHeight();
    });

})(jQuery);
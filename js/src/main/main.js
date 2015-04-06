(function($){

    // We have JavaScript!
    console.log('JavaScript is working!');
    $('html').removeClass('no-js');

    // Have a peek at the config from the console
    console.log('The shared config file is:');
    console.log(TerminallyPixelated);

    // Custom checkboxes / radios
    $('input[type=radio], input[type=checkbox]').checkbox();

    // Custom selects
    $('select').dropdown();

})(jQuery);
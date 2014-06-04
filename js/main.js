if (typeof jQuery === 'function') {
    define('jquery', function () { return jQuery; });
}

// require(['jquery'], function($){

// });

require(['jquery', 'vendor/unveil'], function($){
    $('html').removeClass('no-js');
    $('main img').unveil();
});
export default function() {
    var menu = document.getElementById('nav-main-nav');
    var menuToggle = document.getElementById('main-nav-toggle');
    var menuClose = document.getElementById('main-nav__close');

    if (menu && menuToggle && menuClose) {
        menuToggle.addEventListener('click', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            menu.classList.add('is-active');
            return false;
        });
        menuClose.addEventListener('click', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            menu.classList.remove('is-active');
            return false;
        });
    }
}

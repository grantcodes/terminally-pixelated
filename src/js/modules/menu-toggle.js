export default () => {
  const menu = document.getElementById('nav-main-nav')
  const menuToggle = document.getElementById('main-nav-toggle')
  const menuClose = document.getElementById('main-nav__close')
  if (menu && menuToggle && menuClose) {
    menuToggle.addEventListener('click', e => {
      if (e.preventDefault) {
        e.preventDefault()
      }
      menu.classList.add('is-active')
      return false
    })
    menuClose.addEventListener('click', e => {
      if (e.preventDefault) {
        e.preventDefault()
      }
      menu.classList.remove('is-active')
      return false
    })
  }
}

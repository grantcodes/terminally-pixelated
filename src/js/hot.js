// Hot load all the things.
import '../scss/main.scss'
import './main'

if (module.hot) {
  console.log("🔥🔥🔥🔥🔥 That's hot")
  module.hot.accept(
    [
      './main.js',
      './modules/icon.js',
      './modules/menu-toggle.js',
      './blocks/index.js',
    ],
    function() {
      console.log('🔥 Hot update applied')
    }
  )
}

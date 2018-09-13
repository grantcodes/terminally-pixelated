import '@babel/polyfill'

// import photoswipe from './modules/photoswipe-loader';
import menuToggle from './modules/menu-toggle'

const config = process.env.tpConfig
menuToggle()

// Example to use photoswipe for image previews
// photoswipe('.gallery');

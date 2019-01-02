/**
 * BLOCK: latest-posts
 *
 * Latest posts but using nicer post previews
 */

import edit from './edit'
const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType, unregisterBlockType } = wp.blocks // Import registerBlockType() from wp.blocks

// Disable built in latest posts
// setTimeout(() => unregisterBlockType('core/latest-posts'), 1000)
window.onload = () => unregisterBlockType('core/latest-posts')

registerBlockType('terminally-pixelated/latest-posts', {
  title: __('Latest Posts'),
  description: __('Display a list of your most recent posts.'),
  icon: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0h24v24H0V0z" fill="none" />
      <rect x="11" y="7" width="6" height="2" />
      <rect x="11" y="11" width="6" height="2" />
      <rect x="11" y="15" width="6" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="7" y="11" width="2" height="2" />
      <rect x="7" y="15" width="2" height="2" />
      <path d="M20.1,3H3.9C3.4,3,3,3.4,3,3.9v16.2C3,20.5,3.4,21,3.9,21h16.2c0.4,0,0.9-0.5,0.9-0.9V3.9C21,3.4,20.5,3,20.1,3z M19,19H5V5h14V19z" />
    </svg>
  ),
  category: 'widgets',
  keywords: [__('recent posts')],
  supports: {
    html: false,
  },

  getEditWrapperProps(attributes) {
    const { align } = attributes
    if (
      'left' === align ||
      'right' === align ||
      'wide' === align ||
      'full' === align
    ) {
      return { 'data-align': align }
    }
  },

  edit,
  save: () => null,
})

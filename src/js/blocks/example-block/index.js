/**
 * BLOCK: example-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import template from '../../../../app/views/components/example-block.twig'
const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
const { withSelect } = wp.data
const { TextControl, Placeholder, PanelBody } = wp.components
const { Fragment } = wp.element
const { BlockControls, BlockAlignmentToolbar, InspectorControls } = wp.editor

registerBlockType('terminally-pixelated/example-block', {
  title: __('Example Block'),
  icon: 'align-center',
  category: 'widgets',
  keywords: [__('example'), __('block')],
  attributes: {
    text: {
      type: 'text',
    },
  },

  edit: ({ attributes, setAttributes }) => {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Example Block')}>
            <TextControl
              label={__('Input text:')}
              value={attributes.text}
              onChange={text => setAttributes({ text })}
            />
          </PanelBody>
        </InspectorControls>
        <div
          dangerouslySetInnerHTML={{
            __html: template({ text: attributes.text }),
          }}
        />
      </Fragment>
    )
  },

  save: () => null,
})

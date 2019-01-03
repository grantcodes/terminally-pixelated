/**
 * External dependencies
 */
const { isUndefined, pickBy } = lodash

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element
const {
  PanelBody,
  Placeholder,
  QueryControls,
  RangeControl,
  Spinner,
  ToggleControl,
  Toolbar,
  ServerSideRender,
} = wp.components
const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, BlockAlignmentToolbar, BlockControls } = wp.editor
const { withSelect } = wp.data
/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
  per_page: -1,
}
const MAX_POSTS_COLUMNS = 6

class LatestPostsEdit extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      categoriesList: [],
    }
    this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind(this)
  }

  componentWillMount() {
    this.isStillMounted = true
    this.fetchRequest = wp
      .apiFetch({
        path: addQueryArgs(`/wp/v2/categories`, CATEGORIES_LIST_QUERY),
      })
      .then(categoriesList => {
        if (this.isStillMounted) {
          this.setState({ categoriesList })
        }
      })
      .catch(() => {
        if (this.isStillMounted) {
          this.setState({ categoriesList: [] })
        }
      })
  }

  componentWillUnmount() {
    this.isStillMounted = false
  }

  toggleDisplayPostDate() {
    const { displayPostDate } = this.props.attributes
    const { setAttributes } = this.props

    setAttributes({ displayPostDate: !displayPostDate })
  }

  render() {
    const { attributes, setAttributes, latestPosts } = this.props
    const { categoriesList } = this.state
    const {
      displayPostDate,
      align,
      postLayout,
      columns,
      order,
      orderBy,
      categories,
      postsToShow,
    } = attributes

    const inspectorControls = (
      <InspectorControls>
        <PanelBody title={__('Latest Posts Settings')}>
          <QueryControls
            {...{ order, orderBy }}
            numberOfItems={postsToShow}
            categoriesList={categoriesList}
            selectedCategoryId={categories}
            onOrderChange={value => setAttributes({ order: value })}
            onOrderByChange={value => setAttributes({ orderBy: value })}
            onCategoryChange={value =>
              setAttributes({ categories: '' !== value ? value : undefined })
            }
            onNumberOfItemsChange={value =>
              setAttributes({ postsToShow: value })
            }
          />
          <ToggleControl
            label={__('Display post date')}
            checked={displayPostDate}
            onChange={this.toggleDisplayPostDate}
          />
          {postLayout === 'grid' && (
            <RangeControl
              label={__('Columns')}
              value={columns}
              onChange={value => setAttributes({ columns: value })}
              min={2}
              max={
                !hasPosts
                  ? MAX_POSTS_COLUMNS
                  : Math.min(MAX_POSTS_COLUMNS, latestPosts.length)
              }
            />
          )}
        </PanelBody>
      </InspectorControls>
    )

    const hasPosts = Array.isArray(latestPosts) && latestPosts.length
    if (!hasPosts) {
      return (
        <Fragment>
          {inspectorControls}
          <Placeholder icon="admin-post" label={__('Latest Posts')}>
            {!Array.isArray(latestPosts) ? <Spinner /> : __('No posts found.')}
          </Placeholder>
        </Fragment>
      )
    }

    // Removing posts from display should be instant.
    const displayPosts =
      latestPosts.length > postsToShow
        ? latestPosts.slice(0, postsToShow)
        : latestPosts

    const layoutControls = [
      {
        icon: 'list-view',
        title: __('List View'),
        onClick: () => setAttributes({ postLayout: 'list' }),
        isActive: postLayout === 'list',
      },
      {
        icon: 'grid-view',
        title: __('Grid View'),
        onClick: () => setAttributes({ postLayout: 'grid' }),
        isActive: postLayout === 'grid',
      },
    ]

    return (
      <Fragment>
        {inspectorControls}
        <BlockControls>
          <BlockAlignmentToolbar
            value={align}
            onChange={nextAlign => {
              setAttributes({ align: nextAlign })
            }}
            controls={['center', 'wide', 'full']}
          />
          <Toolbar controls={layoutControls} />
        </BlockControls>
        <ServerSideRender
          block="terminally-pixelated/latest-posts"
          attributes={attributes}
        />
      </Fragment>
    )
  }
}

export default withSelect((select, props) => {
  const { postsToShow, order, orderBy, categories } = props.attributes
  const { getEntityRecords } = select('core')
  const latestPostsQuery = pickBy(
    {
      categories,
      order,
      orderby: orderBy,
      per_page: postsToShow,
    },
    value => !isUndefined(value)
  )
  return {
    latestPosts: getEntityRecords('postType', 'post', latestPostsQuery),
  }
})(LatestPostsEdit)

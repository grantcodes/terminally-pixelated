import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export default function(selector) {
  const pswpElement = document.getElementById('pswp')
  const galleries = document.querySelectorAll(selector)
  let galleriesPhotos = {}

  const openGallery = (gallery, photo) => {
    // Initializes and opens PhotoSwipe
    photo = parseInt(photo)
    const items = galleriesPhotos[gallery]
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
      index: photo,
    })
    gallery.init()
  }

  const photoClick = e => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    e.returnValue = false
    const photoIndex = this.dataset.photoIndex
    const galleryIndex = this.dataset.galleryIndex
    openGallery(galleryIndex, photoIndex)
    return false
  }

  for (var i = galleries.length - 1; i >= 0; i--) {
    const gallery = galleries[i]
    const photos = gallery.children
    const items = []

    // Loop though photos and add them to the gallery and add click listeners.
    for (var x = 0; x < photos.length; x++) {
      const photo = photos[x]
      if (
        photo.href &&
        photo.dataset &&
        photo.dataset.width &&
        photo.dataset.height
      ) {
        items.push({
          src: photo.href,
          w: photo.dataset.width,
          h: photo.dataset.height,
        })
        // Add index data attribute so we can load the correct photo on click
        photo.dataset.galleryIndex = i
        photo.dataset.photoIndex = x
        photo.addEventListener('click', photoClick, false)
      }
    }
    galleriesPhotos[i] = items
  }
}

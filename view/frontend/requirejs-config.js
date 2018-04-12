var config = {
    map: {
        '*': {
            'productGallery': 'Space48_ProductGallery/js/gallery',
            'fancybox': 'Space48_ProductGallery/js/vendor/fancybox3/jquery.fancybox.min',
            'slick': 'Space48_ProductGallery/js/vendor/slick/slick',
            'jquery.zoom': 'Space48_ProductGallery/js/vendor/zoom/jquery.zoom.min'
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Space48_ProductGallery/js/swatch-renderer-mixin': true
            }
        }
    }
}


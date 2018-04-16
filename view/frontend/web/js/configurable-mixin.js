define(['jquery', 'mage/template', 'productGallery'], function($, template, productGallery){
    return function(originalWidget){
        $.widget(
            'mage.configurable', $['mage']['configurable'], {
                _changeProductImage: function () {
                    var images,
                        initialImages = this.options.mediaGalleryInitial;

                    images = this.options.spConfig.images[this.simpleProduct];

                    if (images) {
                        if (this.options.gallerySwitchStrategy === 'prepend') {
                            images = images.concat(initialImages);
                        }

                        images = $.extend(true, [], images);
                        images = this._setImageIndex(images);

                        $(this.options.mediaGallerySelector).trigger('gallery:update', {
                            images: images
                        });
                    } else {
                        $(this.options.mediaGallerySelector).trigger('gallery:update', {
                            images: images
                        });
                    }
                }
            }
        );

        return $['mage']['configurable'];
    };
});

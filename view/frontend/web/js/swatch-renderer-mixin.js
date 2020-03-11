define(['jquery', 'mage/template', 'productGallery'], function($, template, productGallery){
    return function(originalWidget){
        $.widget(
            'mage.SwatchRenderer', $['mage']['SwatchRenderer'], {
                updateBaseImage: function (images, context, isInProductView, gallery) {
                    var justAnImage = images[0],
                        initialImages = this.options.mediaGalleryInitial,
                        imagesToUpdate,
                        isInitial;

                    if (isInProductView) {
                        imagesToUpdate = images.length ? this._setImageType($.extend(true, [], images)) : [];
                        isInitial = _.isEqual(imagesToUpdate, initialImages);

                        if (this.options.gallerySwitchStrategy === 'prepend' && !isInitial) {
                            imagesToUpdate = imagesToUpdate.concat(initialImages);
                        }

                        imagesToUpdate = this._setImageIndex(imagesToUpdate);

                        $(this.options.mediaGallerySelector).trigger('gallery:update', {
                            images: imagesToUpdate
                        });

                    } else if (justAnImage && justAnImage.img) {
                        context.find('.product-image-photo').attr('src', justAnImage.img);
                    }
                }
            }
        );

        return $['mage']['SwatchRenderer'];
    };
});

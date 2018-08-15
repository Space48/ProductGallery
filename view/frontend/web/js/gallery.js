define(['jquery',
    'uiComponent',
    'underscore',
    'mage/template',
    'fancybox',
    'slick',
    'jquery.zoom',
    'domReady!',
    'text!Space48_ProductGallery/template/gallery.html',
    'matchMedia'
], function($, Component, _, template, fancybox, slick, zoom, doc, galleryTpl) {
    return Component.extend({
        initialize: function(config, node) {
            this.config = config;
            this.$node = $(node);

            _.bindAll(this, 'fancyboxOpenGallery', 'beforeChange', 'afterChange', 'galleryUpdate');

            this.$node.on('click ' + this.config.mainCarousel, '.zoomImg', this.fancyboxOpenGallery);
            this.$node.on('gallery:update', this.galleryUpdate);

            this.render(this.config.galleryImagesJson);
        },

        isMobile: function () {
            return window.matchMedia(this.config.isMobileMediaQuery).matches;
        },

        galleryUpdate: function (evt, data) {
            var images = data.images;

            if (!images) {
                images = this.config.galleryImagesJson;
            }

            if (images[0].img) {
                this.render(images);
            } else if (!_.isEqual(this.currentImages, this.config.galleryImagesJson)) {
                this.render(this.config.galleryImagesJson);
            }
        },

        render: function (images) {
            var html = template(galleryTpl, {
                images: images
            });

            this.$node.html(html);
            this.initialiseCarousels();

            this.$(this.config.mainCarousel).on('beforeChange', this.beforeChange);
            this.$(this.config.mainCarousel).on('afterChange', this.afterChange);

            this.currentImages = images;
        },

        beforeChange: function () {
            this.$('.js-gallery-iframe').prop('src', 'about:blank');
            this.zoomOff();
        },

        afterChange: function (evt, slick) {
            var $currentSlide = slick.$slides[slick.currentSlide];
            var $iframe = $('.js-gallery-iframe', $currentSlide);

            if ($iframe.length) {
                this.buildVideoIframe($iframe);
            } else {
                this.zoomOn();
            }
        },

        buildVideoIframe: function ($iframe) {
            // Set height and src param on iframe element
            var galleryHeight = this.$(this.config.mainCarousel + ' .slick-list').outerHeight();
            var src = $iframe.data('src');
            var params = this.config.videoAutoPlay ? '?autoplay=1' : '';

            $iframe.css({
                height: galleryHeight
            });

            $iframe.prop('src',  src + params);
        },

        initialiseCarousels: function() {
            this.$(this.config.mainCarousel).slick(_.extend({
                asNavFor: this.config.thumbnailCarousel
            }, this.config.options));

            this.$(this.config.thumbnailCarousel).slick(_.extend({
                asNavFor: this.config.mainCarousel
            }, this.config.thumbnailOptions));

            this.zoomOn();
        },

        zoomOn: function() {
            if (!this.isMobile()) {
                this.$('.js-gallery-image').zoom({
                    url: this.carouselActiveHref()
                });
            }
        },

        zoomOff: function() {
            // Destroy and reinitialise zoom on slide changes
            if (!this.isMobile()) {
                this.$('.js-gallery-image').trigger('zoom.destroy');
            }
        },

        // When the user clicks on the zoomed image
        zoomClickEvent: function() {
            if(!this.isMobile()) {
                this.$node.on('click', '.zoomImg', this.fancyboxOpenGallery);
            }
        },

        fancyboxOpenGallery: function() {
            $.fancybox.open(
                this.$('img[data-fancybox="product-images"]'),
                this.config.fancyboxOptions || {},
                this.carouselActiveIndex()
            );
        },

        carouselActiveIndex: function() {
            return this.$(this.config.mainCarousel).slick('slickCurrentSlide');
        },

        carouselActiveHref: function() {
            // Get the href on the active slide

            return this.$('.slick-active .js-main-image').attr('href');
        },

        $: function (selector) {
            return $(selector, this.$node);
        }
    });
});

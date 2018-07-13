jQuery.noConflict(); // Set jQuery to NoConflict Mode

/**
 * Plugin Javascript
 */
(function( $ ){
	"use strict";

	/**
	 * All lightbox functions for the plugin
	 * @since v1.3
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.themewichLightBox = function(options) {

		if(this.length == 0) return this; // if nothing supplied

		var defaults = {
			notimages: true
		}

		// create a namespace
		var lightbox 	= {};

		var el = this;
		lightbox.el = this;

		// merge supplied options with the defaults
		lightbox.settings = $.extend({}, defaults, options);
		
		lightbox.el.imageselectors = $(lightbox.el.selector + '[href*=".jpg"]')
			.add(lightbox.el.selector + '[href*="jpeg"]')
			.add(lightbox.el.selector + '[href*=".png"]')
			.add(lightbox.el.selector + '[href*=".gif"]');

		if (lightbox.settings.notimages) {
			lightbox.el.inlineselectors = lightbox.el.not(lightbox.el.imageselectors);
		}

		// Lightbox popups
		lightbox.el.imageselectors.magnificPopup({
			type:'image', 
			closeBtnInside: true,
			mainClass: 'mfp-zoom-in',
			tLoading: '<div class="tw-loading"></div>',
			removalDelay: 500, //delay removal by X to allow out-animation
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
				  return item.el.find('img').attr('title');				  
				},
				 markup: '<div class="mfp-figure">'+
	            '<div class="mfp-close"></div>'+
	            '<div class="mfp-img"></div>'+
	            '<div class="mfp-bottom-bar">'+
	              '<div class="mfp-title-wrapper"><div class="mfp-title"></div></div>'+
	              '<div class="mfp-counter"></div>'+
	            '</div>'+
	          '</div>' // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
			},

			callbacks: {
				imageLoadComplete: function() {
				  var self = this;
				  setTimeout(function() {
				    self.wrap.addClass('mfp-image-loaded');
				  }, 16);
				},
				close: function() {
				  this.wrap.removeClass('mfp-image-loaded');
				}
			},
			closeOnContentClick: true,
			midClick: true
		});

		// Inline popups
	    lightbox.el.inlineselectors.magnificPopup({
	      disableOn: 700,
	      closeBtnInside: true,
	      tLoading: '<div class="tw-loading"></div>',
	      type: 'iframe',
	      mainClass: 'mfp-fade',
	      removalDelay: 160,
	      preloader: false,
	      fixedContentPos: false
	    });
	}

	/**
	 * Isotope function for the plugin
	 * @since v1.3
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.themewichIsotope = function() {

		if(this.length == 0) return this; // if nothing supplied

		$(this).each(function(){

			var $this 			= $(this),
	  	 	 	columnNumber 	= $this.attr('data-value'),
	  	 	 	isoBrick 		= $this.find('.isobrick'),
	  	 	 	colnum 			= 2;

	  	 	// Remove margins
			isoBrick.css({
				'margin-left': 0,
				'margin-right': 0 
			});
	 

			function setColNumber() {
				// Calculate column number
				if ($(window).width() < 767) {
					colnum = 2;
				} else { 
					colnum = columnNumber;
				}
				return colnum;
			}

			function runIsotope() {
				colnum = setColNumber();

				if (columnNumber != '1') {
					$this.isotope({
						masonry: {
					    	columnWidth: $this.width() / colnum
					    },
					    itemSelector : '.isobrick',
					    layoutMode : 'masonry'
					});
				}
			}

			runIsotope(); // run on document.ready

			$(window).resize(function () {
				runIsotope(); // Run on window resize
			});
			// layout Isotope again after all images have loaded
			$this.imagesLoaded( function() {
			  runIsotope();
			});
		});
	};

	$.fn.themewichParallax = function() {
		var $this = $(this);

		function setWidth() {
			var postWidth 	= $this.outerWidth(),
				windowWidth = $(window).width(),
				padding 	= (windowWidth - postWidth)/2;

			$('.tw-full-bg-image').css({
				'margin-left': -padding + 'px',
				'margin-right': -padding + 'px',
				'padding-left' : padding + 'px',
				'padding-right' : padding + 'px'
			});
		}

		setWidth();

		$(window).resize(function(){
			setWidth();
		});
	};

	// Instantiate the plugins
    $(document).ready(function(){
    	if ($.fn.magnificPopup) {
			$('a.tw-lightbox').themewichLightBox();
		}
		$( ".tw-tabs-shortcode" ).tabs({
			heightStyle: "content" // Each panel will be only as tall as its content
		});
		if ($.fn.isotope) {
			$('.tw-postshortcode .isotopecontainer').themewichIsotope();
		}
		if ($.fn.accordion) {
			$('.tw-accordion').accordion({heightStyle: 'content'});
		}
		$('.tw-toggle-trigger').click(function(){
			$(this).toggleClass('active').next().slideToggle('fast');
			return false;
		});
		if ($.fn.themewichParallax) {
			$('.tw-post-break').themewichParallax();
		}

		// redraw
		jQuery.fn.redraw = function() {
			return this.hide(0, function() {
				$(this).show();
			});
		};

		// redraw on load
		$('.chrome .tw-parallax-scroll').redraw();

		// force chrome to re-render on scroll
		$(window).scroll(function() {
			$('.chrome .tw-parallax-scroll').redraw();
		});
	});

})(jQuery);
// Set jQuery to NoConflict Mode
jQuery.noConflict();

/**
 * Themewich Theme Functions
 * 
 * Copyright 2013, Andre Gagnon - http://themewich.com
 * 
 */
(function( $ ){
	"use strict";

	/**
	 * Converts html image to full fixed background
	 * @since v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.parallaxImg = function(){
		if ($('body').hasClass('full-width')){
			$(this).each(function(){
				var $this 		= jQuery(this),
					parallaxsrc = $this.attr('src'),
					captionDiv 	= $this.closest('.wp-caption');
	
				// If there's a caption set
				if (captionDiv.length) {
					captionDiv.removeClass('wp-caption').addClass('post-break has-caption').css('width', 'auto');
					$this.before('<span class="full-bg-image" style="background-image: url('+parallaxsrc+');"></span>');
				} else {
					$this.before('<span class="post-break"><span class="full-bg-image" style="background-image: url('+parallaxsrc+');"></span></span>');
				}
				$this.remove();
			});
		}
	}
	
	
	/**
	 * Sticky nav menu
	 * @since v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.themewichStickyNav = function(){
		var sticky_nav = jQuery(this),
			nav_container = sticky_nav.closest('.top-nav'),
			sticky_cells = sticky_nav.find('.cell'),
			site_container = jQuery('#sitecontainer'),
			sticky_height;
	
			// Only run this once
			if (!sticky_nav.hasClass('stickyloaded')) {
	
				sticky_height = sticky_nav.find('.container').outerHeight();
	
				// Set just the height without padding
				sticky_cells.css({
					'height' : sticky_height + 'px',
					'padding': 0
				});
				
				// Give nav container a fixed position
				nav_container.css('position','fixed');
	
				// Give site container top padding
				site_container.css({
					'padding-top' : sticky_height + (parseInt(sticky_cells.css('padding-top'))*2)//need to use padding due to fixed background bug in chrome
				});
	
				// Add loaded indicator
				sticky_nav.addClass('stickyloaded');
			}
	
			function stickyHeader() {
					sticky_cells.css({
						'height' : sticky_height - getScrollTop()
					});
			}
	
			// Cross browser scrolltop function
			function getScrollTop(){
				if(typeof pageYOffset!= 'undefined'){
					//most browsers
					return pageYOffset;
				}
				else{
					var B = document.body; //IE 'quirks'
					var D = document.documentElement; //IE with doctype
					D = (D.clientHeight)? D: B;
					return D.scrollTop;
				}
			}
	
		$(window).scroll(stickyHeader);
		$(document).ready(stickyHeader);
	
	}
	
	
	/**
	 * Calls lightbox links
	 * @since  v1.0
	 */
	$.fn.themewichLightbox = function() {

		var attachments = jQuery("a.themewich-lightbox, a[rel*='attachment']").addClass('no-ajaxy');

		attachments.magnificPopup({
			type:'image', 
			closeBtnInside: true,
			tLoading: '<img src="' + agAjax.get_template_directory_uri + '/images/small-loading.gif"/>',
			mainClass: 'mfp-zoom-in',
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
	
		jQuery('.open-popup-link').magnificPopup({
			type: 'inline',
	
			fixedContentPos: false,
			fixedBgPos: true,
			tLoading: '<img src="' + agAjax.get_template_directory_uri + '/images/small-loading.gif"/>',
	
			overflowY: 'auto',
	
			closeBtnInside: true,
			preloader: false,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});
	
		jQuery('.gallery').each(function(){

			jQuery(this).magnificPopup({
				delegate: 'a.lightbox-gallery:not(.bx-clone a.lightbox-gallery)',
				type: 'image',
				closeBtnInside: true,
				tLoading: '<img src="' + agAjax.get_template_directory_uri + '/images/small-loading.gif"/>',
				mainClass: 'mfp-zoom-in',
				removalDelay: 500, //delay removal by X to allow out-animation
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
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
		});
	}
	
	
	/**
	 * Matches title height to box height for centering on hover
	 * @since v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.matchHeight = function() {
		function match_height() {
			jQuery('a.postlink .title').not('a.postlink .title.noimages').each(function() {
					var height = jQuery(this).closest('.postphoto').height();
					jQuery(this).css({'height' :  height + 'px'} );
			});
		}
		match_height();
		$(window).resize(function(){
			match_height();
		});
	}
	
	
	/**
	 * Adds javascript hover effects
	 * @since v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.themewichHovers = function() {
	
		function hover_overlay_slides() {
			 jQuery('.featured-image a').each(function() {
				 var $this = jQuery(this).parent().find('img');
					jQuery(this).hover( function() {
						$this.stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
					}, function() {
						$this.stop().animate({opacity : 1}, 250, 'easeOutCubic');
					});
			 });
		}
	
		function hover_overlay_isotope() {	
			jQuery('.no-opacity a.postlink').each(function(){
				// Hover Function
				jQuery(this).hover(function(){
					jQuery(this).find('.overlay').stop().animate({'opacity' : 0.75}, 500, 'easeOutCubic');  
				}, function(){
					jQuery(this).find('.overlay').stop().animate({'opacity' : 0}, 500, 'easeOutCubic');
				});
			});
		}
	
		hover_overlay_isotope();
	
		function hover_overlay_portfolio() {
		   
			jQuery('a.thumblink').each(function() {
			  jQuery(this).closest('.featured-image').addClass('highlight').addClass('loaded').css({'min-height': '0'});
			  var $this = jQuery(this).find('img');
					$this.hover( function() {
						$this.stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
					}, function() {
						$this.stop().animate({opacity : 1}, 250, 'easeOutCubic');
					});
			});
		}
		
		function hide_loading() {
			jQuery('.featured-image').not('.isobrick .featured-image').css({'background': 'none', 'min-height': '0'});
		}
		
		(function($){ $(window).load(function() { hover_overlay_portfolio(); hover_overlay_images(); hide_loading(); }); })(jQuery); 
	   
		
		function hover_overlay_images() {
		
		 jQuery('a img').not('.single-slideshow a img, .featured-image img, .ag_recentprojects_widget a img, .gallery a img, a img.fullimg, a img.fixedimg, .wp-caption a img').each(function() {
			jQuery(this).hover( function() {
				var $this = jQuery(this).parent().children('img');
				jQuery($this).stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
			}, function() {
				var $this = jQuery(this).parent().children('img');
				jQuery($this).stop().animate({opacity : 1}, 250, 'easeOutCubic');
			});
			
		  });
		  
		}
		
	}
	
	
	/**
	 * Responsive slider object
	 * @type {class}
	 */
	var themewichSlider = {
		
		createSlider : function(selector, callback) {
	
			jQuery(selector).each(function(index) {
	
				// Get Options from HTML
				var $this 		= jQuery(this),
					$info 		= $this.closest('.info'),
					$touch		= ($info.hasClass('postphoto')) ? false : true,
					$window 	= jQuery(window),
					autoPlay 	= $info.hasClass('autoplay') ? true : false,
					pauseDelay 	= 5000,
					pauseDelay 	= $info.attr('data-pause') ? parseInt($info.attr('data-pause'), 10) : pauseDelay,
					pauseDelay 	= $info.hasClass('random') ? (Math.floor(Math.random()*10001) + 3000) : pauseDelay,
					speedDelay 	= $info.attr('data-speed') ? parseInt($info.attr('data-speed'), 10) : 500,
					pagerOption = $info.hasClass('pager') ? true : false,
					pagerOption = $info.find('.bxslider li').length > 1 ? pagerOption : false,
					carousel 	= $info.hasClass('carousel') ? true : false,
					autoHover 	= $info.hasClass('hovergo') ? false : true,
					slideMode	= 'fade',
					slideMode 	= $info.hasClass('horizontal') ? 'horizontal' : slideMode,
					slideMode 	= $info.hasClass('vertical') ? 'vertical' : slideMode,
					adaptive 	= $info.hasClass('noadapt') ? false : true;
	
				if (pagerOption == false) {
					$info.removeClass('pager');
				}
				
	
				/**
				 * Carousel Slider
				 * @since v1.0
				 */
				function carouselSlider() {
					var slideWidth 		= 320,
						slideMargin 	= 10,
						totalSlideWidth = slideWidth + slideMargin,
						noWide 			= $('body').hasClass('full-width');
	
				$this.bxSlider({
						//Options
						adaptiveHeight: adaptive,
						minSlides: 		2,
						maxSlides: 		9,
						slideWidth: 	slideWidth,
						slideMargin: 	slideMargin,
						infiniteLoop: 	true,
						pager: 			pagerOption,
						controls: 		true,
						autoControls: 	true,
						useCSS: 		false, //Chrome gets buggy with this enabled
						touchEnabled: 	true,
						captions: 		false,
						preloadImages: 	'visible',
	
						//After Slider Load
						onSliderLoad: function() {
							
							// Closest info container
							$info = $this.closest('.info');
							
							// Fade in and add overlay effect
							$this.animate({'opacity': 1}, 500, 'easeOutCubic');
					
							// Fade In Controls
							$info.find('.bx-controls').animate({'opacity': 1}, 500);
							
							// Remove min-height and loading image
							$this
								.animate({'opacity': 1}, 500, function() {
									$this.closest('div.info')
										.css({
											'min-height': 'none',
											'background': 'none'
										});
								});
			
							// Fix popup issue with cloned slides
							var $clones 	= $this.find('.gallery-icon.bx-clone'),
								$noclones 	= $this.find('.gallery-icon').not('.gallery-icon.bx-clone');
								
								$clones.click(function(e) {
									var $clickedHref = $(this).find('a').attr('href');
									
									$noclones.each(function() {
										var $link = $(this).find('a');
										if ($link.attr('href') == $clickedHref) {
											$link.click();
										}
									});
									e.preventDefault();
								});
	
							// Callback Function
							if (callback && typeof(callback) === "function") {
								callback();
							}
						}
					});
				}
				
	
				/**
				 * Regular Slider
				 * @since v1.0
				 */
				function regularSlider() {
	
				$this.bxSlider({
						// Options
						adaptiveHeight: adaptive,
						mode: 			slideMode,
						auto: 			autoPlay,
						speed: 			speedDelay,
						pause: 			pauseDelay,
						pager: 			pagerOption,
						touchEnabled: 	$touch,
						autoHover:  	autoHover,
						captions: 		false,
						responsive: 	true,
						preloadImages: 'visible',
	
						onSliderLoad: function() {
	
							// Closest info container
							$info = $this.closest('.info');
	
							// Recall isotope after slides load
							if ($this.closest('.isotopeliquid').hasClass('isotope')){
								$('.isotopeliquid').isotope('reLayout');
								$('body').matchHeight(); 
							} else if ($this.closest('.isotopecontainer').hasClass('isotope')) {
								$('.isotopecontainer').isotope('reLayout');
								$('body').matchHeight(); 
							}
	
							// Center the title vertically
							if($info.hasClass('titlerotator')) {
								centerTextSlide($info);
								$(window).resize(function(){
									centerTextSlide($info);
								});
							}
							
							// Fade In Controls
							$info.find('.bx-controls').animate({'opacity': 1}, 500);
	
							// Remove min-height and loading image
							$this
								.animate({'opacity': 1}, 500, function() {
									$this.closest('div.info')
										.css({
											'min-height': 'none',
											'background': 'none'
										});
								});
	
							if (callback && typeof(callback) === "function") {
								callback();
							}
						}
					});
	
				}
				
	
				/**
				 * Centers the slide text vertically
				 * @param  {selector} $info Selector for the slide options
				 * @return {void}       
				 */
				function centerTextSlide($info) {
					if ($info.hasClass('titlerotator') && $info.hasClass('noadapt')) {
						var $maxheight = $this.closest('.pagetitle').find('.bx-viewport').height();
						$this.children('li').each(function(){
							var $originalHeight = $(this).height();
							$(this).css('padding-top', ($maxheight-$originalHeight)/2);
						});
					} 
				}
				
			
				/**
				 * Slider initialization
				 */
				if (carousel) {
					carouselSlider();
				} else {
					regularSlider();	    
				}
	
			}); 
		}  
	}
	
	
	/**
	 * jQuery Isotope Class
	 * @since  v1.0
	 */
	if(jQuery().isotope) {
	
		var themewichIsotope = {
	
			/**
			 * Full-Width Isotope function
			 * @param  {string}   selector Container selector
			 * @param  {Function} callback Callback function
			 * @since v1.0
			 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
			 */
			liquidIsotope : function(selector, callback) {
				jQuery(selector).each(function() {
	
					var $this 		= jQuery(this),
						maxColNum 	= $this.attr('data-value'),
						isoBrick 	= jQuery('.isobrick'),
						$body 		= $('body'),
						$colnum2,
						$colWidth;
	
					// Remove margins
					isoBrick.css({
						'margin-left': 0,
						'margin-right': 0 
					});
	
	
					/**
					 * Sets column number depending on window width
					 */
					function setColNum() {
						var w = $(window).width(), 
							columnNum = 1;
						
						if (w > 1200) {
							columnNum  = 5;
						} else if (w > 900) {
							columnNum  = 4;
						} else if (w > 600) {
							columnNum  = 3;
						} else if (w > 300) {
							columnNum  = 2;
						}
						
						return columnNum;
					}	
	
	
					/**
					 * Gets column number and divides to get column width
					 * @return {integer} Width of column in pixels
					 */
					function getColWidth(){
						var w 			= $this.width(), 
							columnNum 	= setColNum(), 
							colWidth 	= Math.floor(w/columnNum);
	
						return colWidth;
					}
					
					
					/**
					 * Sets dynamic size of isotope brick
					 * @var brick selector
					 */
					function setBrickSize($isobrick) {
						var colWidth 	= getColWidth();
	
						// Set width of each brick
						$this.find('.isobrick').not('.isobrick.noimages').each(function(){ 
							var $brick 		= $(this),
								$brickphoto = $brick.find('.postphoto');
							
							if ($brick.hasClass('big')) {
								$brickphoto.css({
									'width'		 : ((colWidth*2)-4) + 'px',
									'min-height' : (((colWidth*2)-4) * 0.7566) + 'px'
								});
							} else if ($brick.hasClass('slim')) {
								$brickphoto.css( { 
									'width'	 	 : (colWidth-4) + 'px',
									'min-height' : ((colWidth-4) * 0.5) + 'px'
								});
							} else {
								$brickphoto.css( { 
									'width'  	 : (colWidth-4) + 'px',
									'min-height' : ((colWidth-4) * 1.01063) + 'px'
								});
							}					
						});
                        
                        $this.find('.isobrick.noimages').each(function(){
                           	var $brick 		= $(this),
								$brickphoto = $brick.find('.postphoto'); 
                                
                            if ($brick.hasClass('big')) {
								$brickphoto.css({
									'width'		 : ((colWidth*2)-4) + 'px'
								});
							} else if ($brick.hasClass('slim')) {
								$brickphoto.css( { 
									'width'	 	 : (colWidth-4) + 'px'

								});
							} else {
								$brickphoto.css( { 
									'width'  	 : (colWidth-4) + 'px'
								});
							}
                        });
					}
					
					
					/**
					 * Runs isotope script
					 * @return {void} 
					 */
					function callIsotope($itemContainer) {
						var colWidth 	= getColWidth();
						if (maxColNum != '1') {
							$itemContainer.isotope({
								resizable: false, // disable window resizing
								masonry: {
									columnWidth: colWidth
								},
								itemSelector : '.isobrick',
								layoutMode : 'masonry'
							}, function() {
								$('body').matchHeight(); 
							});
							
							// In case it fires too soon due to css3 animations
							$itemContainer.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
								if ($itemContainer.hasClass('isotope')) {
									$itemContainer.isotope('reLayout');
								}
							});
						}
					}
					
					
					/**
					 * Runs infinite scroll
					 * @return {void} 
					 */
					function infiniteScroll($selector) {
						/**
						 * Run infinite scroll
						 */
						if ($.fn.infinitescroll) {
							$selector.infinitescroll({
								navSelector  : '.more-posts',    // selector for the paged navigation 
								nextSelector : '.more-posts a',  // selector for the NEXT link (to page 2)
								itemSelector : '.isotopeliquid .isobrick',     // selector for all items you'll retrieve
								loading: {
									finishedMsg: '',
									img: agAjax.get_template_directory_uri + '/images/loader-horizontal.gif',
									msgText: ''
								  }
								},
		
								// re-call Isotope as a callback
								function( newElements ) {
									console.log(newElements);
									var $newElements = $(newElements);
		
									// Fade in more posts button again
									$('.more-posts').fadeIn(500);
		
									/**
									 * Prepare new elements before insertion
									 * @return {void} 
									 */
									$newElements.each(function(){
										var $brick 		= $(this),
											$brickphoto = $brick.find('.postphoto');
		
										// Reset margins
										$brick.css({
											'margin-left': 0,
											'margin-right': 0
										});
										
										setBrickSize($brickphoto);
									});
		
									// Create slider(s) before insertion
									$(newElements).addClass('inserted');
									themewichSlider.createSlider('.inserted ul.bxslider');
									$(newElements).removeClass('inserted');
		
									/**
									 * Append content to isotope container
									 * @return {void} 
									 */
									$selector.isotope( 'insert', $newElements, function(){
										// Add ajaxify script again 
										if ($.fn.ajaxify) {
											$body.ajaxify();
										}
										$body.matchHeight();
										$body.themewichHovers();
										$selector.isotope('reLayout');
									}); 
								}
							);
		
							// kill scroll binding for manual clicking of button
							$(window).unbind('.infscr');
		
							$('.more-posts a').click(function(){ 
								$(document).trigger('retrieve.infscr');
								$selector.infinitescroll('retrieve'); 
								return false; 
							});
		
							$(document).ajaxError(function(e,xhr,opt){
								if(xhr.status==404) {
									$('.more-posts a').remove();
								}
							});
		
		
							if (callback && typeof(callback) === "function") {
								callback();
							}
						}	
					}
					
					
					/**
					 * Filters items when clicked
					 * @return {void} 
					 */
					function filterSelector($isocontainer) {
						$('#filters a, a.filtersort').click(function(e){
							e.preventDefault();
							$('#filters a').removeClass("active");
	
							  var $selector = $(this).attr('data-filter');
							  
								  $('#filters a').each(function() {
									  var $filterselect = $(this).attr('data-filter');
									  if ($filterselect == $selector){
										$(this).addClass("active");
									  }
								  });
	
							  $isocontainer.isotope({ filter: $selector });
		
						});
					}
					
	
					/**
					 * Runs isotope script
					 * @return {void} 
					 */
					function callMasonry($brick) {						
						// Set brick size
						setBrickSize($brick);					
						// Run isotope
						callIsotope($this);
					}
	
	
					/**
					 * Call scripts on load
					 */
					callMasonry($this.find('.isobrick'));
					infiniteScroll($this);
					filterSelector($this);
					
					
					/**
					 * Call masonry on resize
					 */
					$(window).resize(function(){
						callMasonry();
					});

					// run again after images loaded
					$this.imagesLoaded(function(){
						callMasonry();
					});
							
				});
			},
	
	
			/**
			 * Regular fixed-column isotope
			 * @param  {string}   selector Container selector
			 * @param  {Function} callback Callback function
			 * @since v1.0
			 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
			 */
			loadIsotope : function(selector, callback) {
	
				jQuery(selector).each(function() {
	
					var $this 			= $(this),
						columnNumber 	= $this.attr('data-value'),
						isoBrick 		= $('.isobrick'),
						$body 			= $('body'),
						$colnum2;
	
					// Remove margins
					isoBrick.css({
						'margin-left': 0,
						'margin-right': 0 
					});
			  
			  
			        /**
					* Get column number
					*/
			  		function findColNum() {
						// Get column number
						if ($this.width() < 500 ) {
							$colnum2 = 2;
						} else { 
							$colnum2 = columnNumber;
						}
					}					
					
					
					/**
					 * Sets dynamic size of isotope brick
					 * @var brick selector
					 */
					function setBrickSize($isobrick) {
						
						var columnWidth = $this.width() / $colnum2
	
						// Set width of each brick
						$isobrick.not('.isobrick.noimages').each(function(){ 
							var $brick 		= $(this),
								$brickphoto = $brick.find('.postphoto');
							
							if ($brick.hasClass('big')) {
								$brickphoto.css({
									'min-height' : (((columnWidth*2)-4) * 0.7566) + 'px'
								});
							} else if ($brick.hasClass('slim')) {
								$brickphoto.css( { 
									'min-height' : ((columnWidth-4) * 0.5) + 'px'
								});
							} else {
								$brickphoto.css( { 
									'min-height' : ((columnWidth-4) * 1.01063) + 'px'
								});
							}
												
						});
					}
				
					
					/**
					* Run isotope plugin
					*/
					function callIsotope() {
						// Call isotope with selected columns
						if (columnNumber != '1') {
						  $this.isotope({
						  masonry: {
							  columnWidth: $this.width() / $colnum2
							},
							itemSelector : '.isobrick',
							layoutMode : 'masonry'
						  }, function() {
							$('body').matchHeight(); 
						  });
						}
					}
					
					
					/**
					 * Runs infinite scroll
					 * @return {void} 
					 */
					function infiniteScroll($selector) {
						/**
						 * Run infinite scroll
						 */
					 	if ($.fn.infinitescroll) {
							$selector.infinitescroll({
								navSelector  : '.more-posts',    // selector for the paged navigation 
								nextSelector : '.more-posts a',  // selector for the NEXT link (to page 2)
								itemSelector : '.sixteen.isotopecontainer .isobrick',     // selector for all items you'll retrieve
								loading: {
									finishedMsg: '',
									img: agAjax.get_template_directory_uri + '/images/loader-horizontal.gif',
									msgText: ''
								  }
								},
		
								// re-call Isotope as a callback
								function( newElements ) {
		
									var $newElements = $(newElements);
		
									// Fade in more posts button again
									$('.more-posts').fadeIn(500);
		
									/**
									 * Prepare new elements before insertion
									 * @return {void} 
									 */
									$newElements.each(function(){
										var $brick 		= $(this),
											$brickphoto = $brick.find('.postphoto');
		
										// Reset margins
										$brick.css({
											'margin-left': 0,
											'margin-right': 0
										});
										
										setBrickSize($brickphoto);
									});
		
									// Create slider(s) before insertion
									$(newElements).addClass('inserted');
									themewichSlider.createSlider('.inserted ul.bxslider');
									$(newElements).removeClass('inserted');
		
									/**
									 * Append content to isotope container
									 * @return {void} 
									 */
									$selector.isotope( 'insert', $newElements, function(){
										// Add ajaxify script to new items
										if ($.fn.ajaxify) {
											$body.ajaxify();
										}
										$body.matchHeight();
										$body.themewichHovers();
										$selector.isotope('reLayout');
									}); 
								}
							);
		
							// kill scroll binding for manual clicking of button
							$(window).unbind('.infscr');
		
							$('.more-posts a').click(function(){ 
								$(document).trigger('retrieve.infscr');
								$selector.infinitescroll('retrieve'); 
								return false; 
							});
		
							$(document).ajaxError(function(e,xhr,opt){
								if(xhr.status==404) {
									$('.more-posts a').remove();
								}
							});
		
		
							if (callback && typeof(callback) === "function") {
								callback();
							}	
						}
					}
					
					
					/**
					* Call isotope functions in correct order
					*/
					function runIsotope() {
						
						// Call Functions
						findColNum();
						setBrickSize($this.find('.isobrick'));
						callIsotope();
						
						// In case it fires too soon due to css3 animations
						$this.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
							if ($this.hasClass('isotope')) {
								$this.isotope('reLayout');
							}
						});
					}
					
	
					/**
					* Run Isotope on load
					*/
					runIsotope();
					infiniteScroll($this);
					
					/**
					* Run Isotope on Resize Event
					*/
					$(window).resize(function () {
						runIsotope();
					});

					// run again after images loaded
					$this.imagesLoaded(function(){
						runIsotope();
					});
	
	
					/**
					* Filter link when clicked
					* @return false
					*/
					$('#filters a, a.filtersort').click(function(){
						$('#filters a').removeClass("active");
	
						  var $selector = $(this).attr('data-filter');
						  
							  $('#filters a').each(function() {
								  var $filterselect = $(this).attr('data-filter');
								  if ($filterselect == $selector){
									$(this).addClass("active");
								  }
							  });
	
						  $this.isotope({ filter: $selector });
						  return false;
					});
	
					// Callback
					if (callback && typeof(callback) === "function") {
							callback();
					}
	
				}); // End Each
	
			} 
		} 
	} 
	
	
	/**
	 * Mobile Nav Helper
	 * Nav works without this function, this just helps user experience
	 * @since  v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.mobileNav = function() {
	
		var $linkslist = $('div.mobilenavigation:first #mobilenav a');
			
		function hideMenu() {
			$('html, body').stop().animate({scrollTop: 0}, 500, 'easeOutCubic');
			$linkslist.removeClass('display');
		}
	
		function showMenu(selector) {
			var $this = $(selector);
	
			var offset = $this.offset().top;
			$('html, body').stop().animate({scrollTop:offset}, 500, 'easeOutCubic');
	
			$linkslist.addClass('display');
		}
	
	
	  $(".scroll").click(function(event){
		showMenu('.mobilenavcontainer');
		event.preventDefault();
	  });
	  $(".menutop").click(function(event){
		hideMenu();
		event.preventDefault();
	  });
	  $("#mobilenav .menu-item a").click(function(event){
		hideMenu();
	  });
	
	}
	
	/**
	 * Scroll to top function
	 * @param  {string} selector Top selector
	 * @since  v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.scrollToTop = function() {
	
		var selector 			= this,
			scroll_pos_test 	= 50,
			$viewport 			= $('html, body'); 
		
	  $(window).scroll(function () {
							   
		var y_scroll_pos 		= window.pageYOffset,
			windowWidth 		= $(window).width();
		
		if(y_scroll_pos > scroll_pos_test && windowWidth >= 1130) {
			$(selector).fadeIn(500);
			$('.iphone').children(selector).css('display', 'none !important');
		} else { 
			$(selector).fadeOut(500);
		}
	
		});
		
		// Some event to trigger the scroll animation (with a nice ease - requires easing plugin )...
		$(selector).click(function(e) {
			$viewport.animate({ 
				scrollTop: 0 // set scrollTarget to your desired position
			}, 1700, "easeOutQuint");
			
			// Stop the animation if the user scrolls. Defaults on .stop() should be fine
			$viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
				if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
					 $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
					 
	
				}
			}); 
			
			e.preventDefault();
			return false;
		});
		

	
	}
	
	/**
	 * Hover Helper
	 * @param  {string} selector Top selector
	 * @since  v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.themewichHoverHelper = function() {
		var $this 			= $(this),
			$hoverHelper 	= $('p.hoverhelper').css('opacity', 0).empty();
	
		$this.each(function(){
			$(this).hover( function() {
				var $hovertext = $(this).text();
				$hoverHelper.stop().animate({opacity : 0}, 500, 'easeOutCubic', function() {
					$hoverHelper.empty().text($hovertext).stop().animate({opacity : 1}, 500, 'easeOutCubic');
				});
				
			}, function() {
				$hoverHelper.stop().animate({opacity : 0}, 500, 'easeOutCubic');
			});
		});
	}
	
	/**
	 * Video Wrap Helper
	 * @since  v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.addVideoWrap = function() {
		$('.fluid-width-video-wrapper').wrap('<div class="fixed">');
	}
	
	/**
	 * Height Helper
	 * @param  {string} selector element selector
	 * @since  v1.0
	 * (c) Copyright 2013 Andre Gagnon - http://themewich.com
	 */
	$.fn.heightHelper = function() {
		var h 		= '';
		$(this).each(function(){ 
			var $this 	= $(this),
				w 		= $(this).width();
			if ($this.closest('.isobrick').hasClass('big')) {
				h = w * 0.7566;	
			} else if ($this.hasClass('slim')) {
				h = w * 0.5;
			} else {
				h = w * 1.01063;
			}
			$this.css({'min-height' : h+'px'}).attr('data-height', h);
		});	
	}
	
	
	/**
	 * Initialize all scripts here
	 *
	 * Comment out script lines to remove functionality
	 */
	$.fn.themewichScripts = function(){
		
		// Run theme plugins
		if ($.fn.magnificPopup) {
			$('body').themewichLightbox();
		}
		if ($.fn.fitVids) {
			$('body').fitVids();
		}
		if ($.fn.superfish) {
			$('ul.sf-menu').superfish({ cssArrows: true });
		}
		if ($.fn.validate) {
			$("#contactform").validate();
			$("#quickform").validate();
			$("#commentsubmit").validate();
		}
		if ($.fn.themewichTabs) {
			$('ul.tabs').themewichTabs();
		}
		if ($.fn.bxSlider && $('ul.bxslider').length) {
			themewichSlider.createSlider('ul.bxslider');
		}
		if ($.fn.isotope) {
			if ($('.sixteen.isotopecontainer, .isotopecontainer.twocol').length) {
				themewichIsotope.loadIsotope('.sixteen.isotopecontainer, .isotopecontainer.twocol');
			}
			if ($('.isotopeliquid').length) {
				themewichIsotope.liquidIsotope('.isotopeliquid');
			}
		}
		
		// Run the theme-specific functions
		$('img.parallaximg').parallaxImg();
		$('.top-nav').themewichStickyNav(); 
		$('body').addVideoWrap();
		$('body').mobileNav();
		$('.top').scrollToTop();
		$('body').themewichHovers();
		$('.controls a').themewichHoverHelper();
	}
	
	$(document).ready(function() {
		$('body').themewichScripts();
	});
	
})(jQuery);
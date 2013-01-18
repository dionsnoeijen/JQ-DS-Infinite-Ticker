// jQuery Plugin Infinite Ticker
// Ticker using the Canvas Component
// version 1.0
// by Dion Snoeijen
(function($) {
    $.infiniteTicker = function(element, options) {
        var defaults = {
			images: [],
			fullWidth: false,
			fullHeight: false,
			width: 100,
			height: 100,
			speed: 30,
			direction: 'left'
		}
		
        var it = this;
        it.settings = {};
		
        var $element = $(element), element = element, loadedImages,
			tickerCanvas, ctx, xPos,
			offset = 0, totalStreamWidth, relativeMouseX,
			relativeMouseY, totalElementsWidth = 0, canvasWidth,
			canvasHeight, c = false, debugging = false, 
			copyKey = 0, stream = new Array(), currentOverlay,
			overlayStart = 0, pos, timer,
			absoluteMouseX, absoluteMouseY;
		
        it.init = function() {
			// -------------------------
			//	Initialize settings
			// -------------------------
            it.settings = $.extend({}, defaults, options);
			
			// -------------------------
			//	Setup the canvas first
			// -------------------------
			canvasSetup();
			
			// -------------------------
			//	Load and place the images
			// -------------------------
			initializeImages();
			
			// -------------------------
			//	Do we have a console?
			// -------------------------
			if(console && console.log) { c = true; }
        }
		
		var canvasSetup = function() {
			tickerCanvas = $element[0];
			if(tickerCanvas && tickerCanvas.getContext) {
				ctx = tickerCanvas.getContext('2d');
			}
		}
		
		/**
		 *	Load the images and prepare Array's.
		 */
		var preloadCounter = 0;
        var initializeImages = function() {
			loadedImages = new Array();
			for(var i in it.settings.images) {
				var img = new Image();
				loadedImages.push([img, it.settings.images[i][1]]);
				img.onload = function() {
					preloadCounter++;
					if(preloadCounter == loadedImages.length) {
						setImageStream();
						resizeCanvas();
						startAnimation();
					}
				}
				if($.isArray(it.settings.images[i])) {
					img.src = it.settings.images[i][0];
				} else {
					img.src = it.settings.images[i];
				}
			}
			
			// -------------------------
			//	Listen for resizing
			// -------------------------
			if(ctx != null) {
				$(window).resize(resizeCanvas);
			}
        }
		
		$element.mousemove(function(e) {
			relativeMouseX = e.pageX - this.offsetLeft;
    		relativeMouseY = e.pageY - this.offsetTop;
			changeImage();
		});
		
		$(window).mousemove(function(e) {
			absoluteMouseX = e.pageX;
			absoluteMouseY = e.pageY;
		});
		
		$element.mouseover(function(e) {
			if(c && debugging) { console.log(relativeMouseX + ' ' + relativeMouseY) };
		});
		
		$element.click(function(e) {
			changeImage();
		});
		
		var changeImage = function () {
			if(c && debugging) {console.log('CLICK: ' + relativeMouseX + ' ' + relativeMouseY);}
			
			pos = -stream[0][0].width;
			var nextPos = 0;
			
			for(var i in stream) {
				var w = stream[i][0].width;
				pos += w;
				nextPos += w;
				if(relativeMouseX >= (pos - offset) && relativeMouseX <= (nextPos - offset)) {
					// -------------------------
					//	if the overlay is div, append it to parent
					// -------------------------
					removeOverlay();
					
					currentOverlay = $(stream[i][1]);
					currentOverlay.css({left:(pos - offset)});
					$element.parent().append(currentOverlay);
					break;
				}
			}
		}
		
		var removeOverlay = function () {
			if(currentOverlay) {
				currentOverlay.remove();
			}
		}
		
		var setImageStream = function() {
			for (var i in loadedImages) {
				totalElementsWidth += loadedImages[i][0].width;
			}
			stream = loadedImages;
			if(c && debugging) {console.log(totalElementsWidth);}
		}
		
		var addImagesToTicker = function() {
			// -------------------------
			//	Clear the canvas
			// -------------------------
			tickerCanvas.width = tickerCanvas.width;
			
			// -------------------------
			//	Draw Images
			// -------------------------
			for(var i in stream) {
				var w = stream[i][0].width;
				ctx.drawImage(stream[i][0], (i * w) - offset, 0);
			}
			
			if(currentOverlay) {
				currentOverlay.css({left:pos - offset});
			}
			
			// -------------------------
			//	Add to stream?
			// -------------------------
			var reachingTheEndAt = offset + canvasWidth;
			if(reachingTheEndAt >= totalElementsWidth) {
				if(c && debugging) {console.log(loadedImages[copyKey] + ' ' + totalElementsWidth);}
				stream.push(loadedImages[copyKey]);
				totalElementsWidth += loadedImages[copyKey][0].width;
				copyKey++;
				if(copyKey == (loadedImages.length - 1)) {
					copyKey = 0;
				}
			}
		}
		
		var movePixel = function() {
			// -------------------------
			//	Direction
			// -------------------------
			if(it.settings.direction == 'left') {
				// -------------------------
				//	This means the offset should get bigger
				// -------------------------
				offset++;
				// -------------------------
				//	If the offset reaches the width of the upcoming left
				//	image remove it from the stream and reset the offset and maintain the totalElementsWidth
				// -------------------------
				if(offset == stream[0].width) {
					// -------------------------
					//	Decrement the copyKey so the right 
					//	image is selected while adding to the stream
					// -------------------------
					copyKey--;
					offset = 0;
					totalElementsWidth -= stream[0].width;
					var remove = stream.shift();
					if(c && debugging) { console.log(remove); console.log(stream.length); }
				}
			} else {
				if(c) { console.log('WARNING, TOTALLY UNTESTED'); }
			}
			
			// -------------------------
			//	Add to ticker
			// -------------------------
			addImagesToTicker();
		}
		
		var startAnimation = function() {
			it.settings.speed = it.settings.speed < 20 ? 20 : it.settings.speed;
			timer = setInterval(movePixel, it.settings.speed);
		}
		
		var resizeCanvas = function() {
			// -------------------------
			//	Get information
			// -------------------------
			canvasWidth = it.settings.fullWidth == true ? $(window).width() : it.settings.width;
			canvasHeight = it.settings.fullHeight == true ? $(window).height() : it.settings.height;
			
			// -------------------------
			//	Set
			// -------------------------
			$(tickerCanvas).attr('width', canvasWidth);
			$(tickerCanvas).attr('height', canvasHeight);
			
			// -------------------------
			//	Redraw Canvas
			// -------------------------
			addImagesToTicker();
		}

        it.init();
    }

    $.fn.infiniteTicker = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('infiniteTicker')) {
                var it = new $.infiniteTicker(this, options);
                $(this).data('infiniteTicker', it);
            }
        });
    }

})(jQuery);
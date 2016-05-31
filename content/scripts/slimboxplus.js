/*!
	Original Code:
	Slimbox v1.64 - The ultimate lightweight Lightbox clone
	(c) 2007-2008 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
	
	Slimbox Plus v1.00 
	Modified by OrangeBread (http://www.lifewithpixel.com)
	License is the same as the original Slimbox v1.64
	29th Sept, 2008
	1) Added IFrame support to Slimbox v1.64.	

	Additions by Peter Klein
	-	Added TYPO3 specific Print & Save options.	
	- 	Support to set content size. You can add width/height parameters in the "rev" attribute of the anchor url.
		ex1) <a href="image.jpg" rev="width=50%, height=50%" rel="lightbox"><img src="image_thumb.jpg" alt="image"></a>
		ex2) <a href="text.html" rev="width=500, height=300" rel="lightbox">some text here</a>
*/

var Slimbox;

(function() {

	// Global variables, accessible to Slimbox only
	var state = 0, options, images, activeImage, prevImage, nextImage, top, fx, preload, preloadPrev = new Image(), preloadNext = new Image(),
	// State values: 0 (closed or closing), 1 (open and ready), 2+ (open and busy with animation)

	// DOM elements
	overlay, center, image, iframe, prevLink, nextLink, bottomContainer, bottom, caption, number,printB,saveB;

	/*
		Initialization
	*/

	window.addEvent("domready", function() {
		// Append the Slimbox HTML code at the bottom of the document
		$(document.body).adopt(
			$$([
				overlay = new Element("div").set('id','lbOverlay').addEvent("click", close),
				center = new Element("div").set('id',"lbCenter"),
				bottomContainer = new Element("div").set('id',"lbBottomContainer")
			]).setStyle("display", "none")
		);

		image = new Element("div").set('id',"lbImage").injectInside(center).adopt(
			prevLink = new Element("a").set('id',"lbPrevLink").set('href',"#").addEvent("click", previous),
			nextLink = new Element("a").set('id',"lbNextLink").set('href',"#").addEvent("click", next)
		);
		
		iframe = new Element("iframe").set('id',"lbImage").addEvent("load", nextEffect).injectInside(image);

		bottom = new Element("div").set('id',"lbBottom").injectInside(bottomContainer).adopt(
			new Element("a").set('id',"lbCloseLink").set('href',"#").addEvent("click", close),
			printB = new Element("a").set('id','lbPrintLink').set('href','#').addEvent("click", print),
			saveB = new Element("a").set('id','lbSaveLink').set('href','#').addEvent("click", save),
			caption = new Element("div").set('id',"lbCaption"),
			number = new Element("div").set('id',"lbNumber"),
			new Element("div").setStyle('clear',"both")
		);

		fx = {
			overlay: new Fx.Tween(overlay, {property: "opacity", duration: 500}).set(0),
			image: new Fx.Tween(image, {property: "opacity", duration: 500, onComplete: nextEffect}),
			bottom: new Fx.Tween(bottom, {property: "margin-top", duration: 400})
		};
		// Append the Slimbox HTML code at the bottom of the document
/*/		$(document.body).adopt(
			$$([
				overlay = new Element("div", {id: "lbOverlay"}).addEvent("click", close),
				center = new Element("div", {id: "lbCenter"}),
				bottomContainer = new Element("div", {id: "lbBottomContainer"})
			]).setStyle("display", "none")
		);

		image = new Element("div", {id: "lbImage"}).injectInside(center).adopt(
			prevLink = new Element("a", {id: "lbPrevLink", href: "#"}).addEvent("click", previous),
			nextLink = new Element("a", {id: "lbNextLink", href: "#"}).addEvent("click", next)
		);
		
		iframe = new Element("iframe", {id: "lbImage"}).addEvent("load", nextEffect).injectInside(image);

		bottom = new Element("div", {id: "lbBottom"}).injectInside(bottomContainer).adopt(
			new Element("a", {id: "lbCloseLink", href: "#"}).addEvent("click", close),
			printB = new Element("a", {id: 'lbPrintLink', href: '#'}).addEvent("click", print),
			saveB = new Element("a", {id: 'lbSaveLink', href: '#'}).addEvent("click", save),
			caption = new Element("div", {id: "lbCaption"}),
			number = new Element("div", {id: "lbNumber"}),
			new Element("div", {styles: {clear: "both"}})
		);

		fx = {
			overlay: new Fx.Tween(overlay, {property: "opacity", duration: 500}).set(0),
			image: new Fx.Tween(image, {property: "opacity", duration: 500, onComplete: nextEffect}),
			bottom: new Fx.Tween(bottom, {property: "margin-top", duration: 400})
		};/**/
	});


	/*
		API
	*/

	Slimbox = {
		open: function(_images, startImage, _options) {
			options = $extend({
				loop: false,				// Allows to navigate between first and last images
				overlayOpacity: 0.8,			// 1 is opaque, 0 is completely transparent (change the color in the CSS file)
				resizeDuration: 400,			// Duration of each of the box resize animations (in milliseconds)
				resizeTransition: false,		// Default transition in mootools
				initialWidth: 250,			// Initial width of the box (in pixels)
				initialHeight: 250,			// Initial height of the box (in pixels)

				psScriptPath: '',
				enablePrintButton: 0,
				enableSaveButton: 0,
				
				animateCaption: true,
				showCounter: true,			// If true, a counter will only be shown if there is more than 1 image to display
				counterText: "Item {x} of {y}",		// Translate or change as you wish
				defaultIframeWidth : 850, 
				defaultIframeHeight: 500
			}, _options || {});

			// The function is called for a single image, with URL and Title as first two arguments
			if (typeof _images == "string") {
				_images = [[_images,startImage]];
				startImage = 0;
			}

			// Hide print button if not enabled or path not set
			if (!options.enablePrintButton || !options.psScriptPath) {
				// printB.setStyle('display','none');
				printB.setStyles({visibility: 'hidden',display:'none',width:'0px'});
			};
			// Hide save button if not enabled or path not set
			if (!options.enableSaveButton || !options.psScriptPath) {
				//saveB.setStyle('display','none');
				saveB.setStyles({visibility: 'hidden',display:'none',width:'0px'});
			};
			
			images = _images;
			options.loop = options.loop && (images.length > 1);
			position();
			setup(true);
			top = window.getScrollTop() + (window.getHeight() / 15);
			fx.resize = new Fx.Morph(center, $extend({duration: options.resizeDuration, onComplete: nextEffect}, options.resizeTransition ? {transition: options.resizeTransition} : {}));
			center.setStyles({top: top, width: options.initialWidth, height: options.initialHeight, marginLeft: -(options.initialWidth/2), display: ""});
			fx.overlay.start(options.overlayOpacity);
			state = 1;
			return changeImage(startImage);
		}
	};

	Element.implement({
		slimbox: function(_options, linkMapper) {
			// The processing of a single element is similar to the processing of a collection with a single element
			$$(this).slimbox(_options, linkMapper);
			return this;
		}
	});

	Elements.implement({
		/*
			options:	Optional options object, see Slimbox.open()
			linkMapper:	Optional function taking a link DOM element and an index as arguments and returning an array containing 2 elements:
					the image URL and the image caption (may contain HTML)
			linksFilter:	Optional function taking a link DOM element and an index as arguments and returning true if the element is part of
					the image collection that will be shown on click, false if not. "this" refers to the element that was clicked.
					This function must always return true when the DOM element argument is "this".
		*/
		slimbox: function(_options, linkMapper, linksFilter) {
			linkMapper = linkMapper || function(el) {
				return [el.href, el.title, el.rev];
			};

			linksFilter = linksFilter || function() {
				return true;
			};

			var links = this;

			links.removeEvents("click").addEvent("click", function() {
				// Build the list of images that will be displayed
				var filteredLinks = links.filter(linksFilter, this);
				return Slimbox.open(filteredLinks.map(linkMapper), filteredLinks.indexOf(this), _options);
			});

			return links;
		}
	});


	/*
		Internal functions
	*/

	function position() {
		overlay.setStyles({top: window.getScrollTop(), height: window.getHeight()});
	}

	function setup(open) {
		["object", window.ie ? "select" : "embed"].forEach(function(tag) {
			Array.forEach(document.getElementsByTagName(tag), function(el) {
				if (open) el._slimbox = el.style.visibility;
				el.style.visibility = open ? "hidden" : el._slimbox;
			});
		});

		overlay.style.display = open ? "" : "none";

		var fn = open ? "addEvent" : "removeEvent";
		window[fn]("scroll", position)[fn]("resize", position);
		document[fn]("keydown", keyDown);
	}

	function keyDown(event) {
		switch(event.code) {
			case 27:	// Esc
			case 88:	// 'x'
			case 67:	// 'c'
				close();
				break;
			case 37:	// Left arrow
			case 80:	// 'p'
				previous();
				break;	
			case 39:	// Right arrow
			case 78:	// 'n'
				next();
		}
		// Prevent default keyboard action (like navigating inside the page)
		return false;
	}

	function previous() {
		return changeImage(prevImage);
	}

	function next() {
		return changeImage(nextImage);
	}

	function changeImage(imageIndex) {
		if ((state == 1) && (imageIndex >= 0)) {
			state = 2;
			activeImage = imageIndex;
			prevImage = ((activeImage || !options.loop) ? activeImage : images.length) - 1;
			nextImage = activeImage + 1;
			if (nextImage == images.length) nextImage = options.loop ? 0 : -1;

			$$(prevLink, nextLink, image, iframe, bottomContainer).setStyle("display", "none");
			fx.bottom.cancel().set(0);
			fx.image.set(0);
			center.className = "lbLoading";						
			
			// check item type
			var url = images[activeImage][0];	
			
			var re_imageURL = /\.(jpe?g|png|gif|bmp)/i;
			if( url.match(re_imageURL) ) {
				$$(printB,saveB).setStyle("display", "");
				preload = new Image();	// JavaScript native Object
				preload.datatype = 'image';
				preload.onload = nextEffect;
				preload.src = url;
			}else{
				$$(printB,saveB).setStyle("display", "none");
				preload = new Object ();	// JavaScript native Object
				preload.datatype = 'iframe';
				rev = images[activeImage][2];
				preload.w = matchOrDefault(rev, new RegExp("width=(\\d+)", "i"), options.defaultIframeWidth);
				preload.h = matchOrDefault(rev, new RegExp("height=(\\d+)", "i"), options.defaultIframeHeight);
				iframe.setProperties({id: "lbFrame_" + new Date().getTime(), width: preload.w, height: preload.h, scrolling:'yes', frameBorder:0, src: url});				
			}				
		}

		return false;
	}

	function nextEffect() {
		switch (state++) {					
			case 2:
				center.className = "";

				// create HTML element
				if( preload.datatype == 'image' ) {
					var winWidth  = window.innerWidth  - 20;
					var winHeight = window.innerHeight - 80;
					if (winWidth > winHeight) { 
					    var maxSize = winHeight; 
					} else { 
					    var maxSize = winWidth;
					}

					/* determine proper w and h for img, based on original image'w dimensions and maxSize */
					var my_w = preload.width; 
					var my_h = preload.height;            

					if (my_w > my_h) {
					    my_h = maxSize * my_h / my_w;
					    my_w = maxSize;
					} else {
					    my_w = maxSize * my_w / my_h;
					    my_h = maxSize;
					}

					if (preload.width > my_w || preload.height > my_h){ /* constrain it */
						image.setStyles({backgroundImage: "url(" + preload.src + ")",backgroundSize:""+my_w+"px "+my_h+"px",display: ""});
						$$(image, bottom).setStyle("width", my_w);
						$$(image, prevLink, nextLink).setStyle("height", my_h);
						$$(prevLink, nextLink).setStyle("width", "50%");
					}
					else { /* default behaviour  NORMAL before hacking*/
						image.setStyles({backgroundImage: "url(" + preload.src + ")", display: ""});
						$$(image, bottom).setStyle("width", preload.width);
						$$(image, prevLink, nextLink).setStyle("height", preload.height);
						$$(prevLink, nextLink).setStyle("width", "50%");
			        	}

/*					image.setStyles({backgroundImage: "url(" + preload.src + ")", display: ""});
					$$(image, bottom).setStyle("width", preload.width);
					$$(image, prevLink, nextLink).setStyle("height", preload.height);
					$$(prevLink, nextLink).setStyle("width", "50%");*/
				}else{					
					image.setStyles({backgroundImage: "", display: ""});
					$$(image, bottom).setStyle("width", preload.w);
					$$(image).setStyle("height", preload.h);					
					$$(prevLink, nextLink).setStyle("height", "35px");
					$$(prevLink, nextLink).setStyle("width", "65px");
					iframe.setStyles({display: ""});
				}
				
				caption.set('html', images[activeImage][1] || "");
				number.set('html', (options.showCounter && (images.length > 1)) ? options.counterText.replace(/{x}/, activeImage + 1).replace(/{y}/, images.length) : "");

				if (prevImage >= 0) preloadPrev.src = images[prevImage][0];
				if (nextImage >= 0) preloadNext.src = images[nextImage][0];

				if (center.clientHeight != image.offsetHeight) {
					fx.resize.start({height: image.offsetHeight});
					break;
				}
				state++;
			case 3:
				if (center.clientWidth != image.offsetWidth) {
					fx.resize.start({width: image.offsetWidth, marginLeft: -image.offsetWidth/2});
					break;
				}
				state++;
			case 4:
				bottomContainer.setStyles({top: top + center.clientHeight, marginLeft: center.style.marginLeft, visibility: "hidden", display: ""});
				fx.image.start(1);
				break;
			case 5:
				if (prevImage >= 0) prevLink.style.display = "";
				if (nextImage >= 0) nextLink.style.display = "";
				if (options.animateCaption) {
					fx.bottom.set(-bottom.offsetHeight).start(0);
				}
				bottomContainer.style.visibility = "";
				state = 1;
		}
	}

	function close() {
		if (state) {
			state = 0;
			preload.onload = $empty;		
			for (var f in fx) fx[f].cancel();
			$$(center, bottomContainer).setStyle("display", "none");
			fx.overlay.chain(setup).start(0);
		}

		return false;
	}
	
	function matchOrDefault(str, re, val){
		var hasQuery = str.match(re);
		return hasQuery ? hasQuery[1] : val;
	}
	
	function print(){
		return printOrSave('print');
	}
	function save(){
		return printOrSave('save');
	}
	function printOrSave(mode) {
		if (options.psScriptPath) {// Note to self: &image gets fucked up by packers, so remember to check after packing.
			var myRef = window.open(options.psScriptPath+'?mode='+mode+'&image='+images[activeImage][0],'printsave', 'left=0,top=0,width='+(parseInt(image.style.width))+',height='+ (parseInt(image.style.height)) +',toolbar=0,resizable=1');
			return false; // needed to prevent the calling page to reload
		}
		return true;
	}
	
})();

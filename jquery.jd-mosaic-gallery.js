/*
 * jQuery Mosaic Gallery plugin
 * Version 0.3  (Oct. 09, 2013)
 * @requires jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/*
 * Examples can be found at http://www.dosne.net/mosaic-gallery/
 *
*/
(function($) {
	$.fn.jdMosaicGallery = function( params )
	{
		var $t = $(this),
			images = [],
			nbImagesTotal = 0,
			indexImageToChange = 0,
			timer = 0,
			
			// Default params
			loop = true,
			nbImagesInMosaic = 6,
			autoStart = false,
			loopTime = 2000,
			
			debug = false;
		
		if( params )
		{
			if( params.nbImagesInMosaic !== undefined ) { nbImagesInMosaic = params.nbImagesInMosaic; }
			if( params.autoStart !== undefined ) { autoStart = params.autoStart; }
			if( params.debug === true ) { debug = true; }
		}
		
		/**
		 * Initialization function
		 */
		$t.initGallery = function ()
		{
			var i, img;
			var $li = $t.find('li');
			$li.each(function(){
				images.push($(this));
			});
			
			nbImagesTotal = images.length;
			if( images.length < nbImagesInMosaic + 1)
			{
				if(window.console && window.console.warn)
				{
					window.console.warn('Images count must superior to "nbImagesInMosaic" + 1');
				}
				nbImagesInMosaic = nbImagesTotal - 1;
			}
		
			for( i = 0; i < nbImagesInMosaic; i++)
			{
				img = images[i];
				img.show();
				img.fadeIn("slow");
			}
			for( i = nbImagesInMosaic; i < nbImagesTotal; i++)
			{
				img = images[i];
				img.hide();
				
			}
		};
		
		/**
		 * Swith image. Grab an image in the "background" to show it.
		 */
		$t.switchImage = function ()
		{
			var index = indexImageToChange;
			var liTags = $t.find('li');
			$t.log("liTags : ", liTags);

			$t.log("New : "+liTags.eq(nbImagesInMosaic).attr('id'));
			liTags.eq(nbImagesInMosaic).insertBefore(liTags.eq(index));
			liTags.eq(nbImagesInMosaic).fadeIn();
			liTags = $t.find('li');

			$t.log("Old : "+liTags.eq(index+1).attr('id'));
			var oldItem = liTags.eq(index+1);
			var newItem = liTags.eq(nbImagesInMosaic);
			// We prevent to move an item after itself
			if(oldItem.attr('id') !== newItem.attr('id'))
			{
				oldItem.insertAfter(newItem);
			}
			oldItem.hide();

			indexImageToChange++;
			if( indexImageToChange === nbImagesInMosaic )
			{
				if( loop )
				{
					indexImageToChange = 0;
				}
				else
				{
					clearInterval(timer);
				}
			}
		};
		
		/**
		 * Start to animat the gallery
		 */
		$t.startShow = function ()
		{
			timer = setInterval(function(){$t.switchImage();}, loopTime);
		};
		
		/**
		 * Simple log function
		 */
		$t.log = function()
		{
			if(debug && debug === true && console)
			{
				if(navigator.userAgent.toLowerCase().indexOf("applewebkit") !== -1)
				{
					console.log(arguments);
				}
				else
				{
					console.log.apply(this, arguments);
				}
			}
		};
	
		$t.initGallery();
		
		if( autoStart ) {
			$t.startShow(); }
			
		return $t;
	};
})(jQuery);
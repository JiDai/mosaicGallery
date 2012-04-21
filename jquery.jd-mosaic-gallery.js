/*
 * jQuery Mosaic Gallery plugin
 * Version 0.2  (May 14, 2011)
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
			loopTime = 2000;
		
		if( params && params.nbImagesInMosaic !== undefined ) { nbImagesInMosaic = params.nbImagesInMosaic; }
		if( params && params.autoStart !== undefined ) { autoStart = params.autoStart; }
		
		
		$t.initGallery = function ()
		{
			var i, img;
			$t.find('li').each(function(){
				images.push($(this));
			});
			
			nbImagesTotal = images.length;
		
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
		
		$t.switchImage = function ()
		{
	
			var index = indexImageToChange;
			var newIndex = index + nbImagesInMosaic;
			var liTags = $t.find('li');
	
			$('#'+liTags[newIndex].id).insertBefore($('#'+liTags[index].id));
			$('#'+liTags[index].id).insertBefore($('#'+liTags[newIndex+1].id));
			
			$('#'+liTags[index].id).hide();
			$('#'+liTags[newIndex].id).fadeIn("slow");
			
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
		
		$t.startShow = function ()
		{
			timer = setInterval(function(){$t.switchImage();}, loopTime);
		};
	
		$t.initGallery();
		
		if( autoStart ) {
			$t.startShow(); }
			
		return $t;
	};
})(jQuery);
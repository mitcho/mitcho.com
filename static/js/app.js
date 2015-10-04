Zepto(function($) {
	// make the entire research entry a tap target:
	$('.research-group li, .files .file').on('click', function(e) {
		// find the closest target:
		var target = $(e.target).closest('a, .research-group li, .files .file');
		if ( target.index(this) > -1 ) {
			if ( target.find('.title').length )
				window.location = target.find('.title').attr('href');
			else
				window.location = target.find('a').first().attr('href');
		}
	});

	// track file download:	
	$('a[data-event]').on('click', function(e) {
		var that = $(this);

		// it's possible ga won't be loaded, due to tracking-blockers
		if (typeof ga != 'function')
			return document.location = that.attr('href');

		ga('send', 'event', 'file', 'download', that.attr('data-event'), {
			'hitCallback' : function () { document.location = that.attr('href'); }
		});
		e.preventDefault();
		
		// just in case, allow redirect after 200ms delay, regardless of whether ga triggered.
		setTimeout( function () { document.location = that.attr('href'); }, 200);
	})
});

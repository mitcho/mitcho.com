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
//		e.preventDefault();
	});
});

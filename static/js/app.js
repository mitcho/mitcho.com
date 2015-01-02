Zepto(function($) {
	// make the entire research entry a tap target:
	$('.research-group li').on('click', function(e) {
		// find the closest target:
		var target = $(e.target).closest('a,li');
		if ( target.index(this) > -1 )
			window.location = target.find('.title').attr('href');
//		e.preventDefault();
	});
});

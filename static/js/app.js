var states = [];
function maybeOverlay(url) {
	var $ = Zepto;
	// todo: detect whether HTML5 History exists. If not, skip all this.

	var match = url.match(/^(http:\/\/mitcho.com|http:\/\/127.0.0.1:4000)?\/research\/(.*)\.html/);

	if ( !match.length )
		return window.location = url;

	// it's overlay time:
	var slug = match[2];
	$.get('/research/' + slug + '.overlay.html', function (data, status, xhr) {
		var parsed = $(data);
		var title = parsed.find('title').text();
		
		// todo: make old overlay disappear more elegantly
		$('.col3').remove();
		
		// save state:
		states.push({title: window.title, url: window.location});
		// transition!
		$('.col2').after(parsed.find('.col3'));
		$('.col2').addClass('overlayed');
		history.pushState(null, title, '/research/' + slug + '.html');
		
	}, 'html');
}

function resizeCol3() {
	var $ = Zepto;
	var offset = $('.col3').offset();
	var needed = $(window).width() - offset.left - 880;
	if (needed > 0)
		$('.col3').css('padding-right', needed);
	else
		$('.col3').css('padding-right', 0);
}

Zepto(function($) {
	// make the entire research entry a tap target:
	$('.research-group li').on('click', function(e) {
		// find the closest target:
		var target = $(e.target).closest('a,li');
		if ( target.index(this) > -1 )
			maybeOverlay(target.find('.title').attr('href'));
		e.preventDefault();
	});
	
	$('a').on('click', function() {
		var url = $(e.target).attr('href');
		maybeOverlay(url);
	});
	
	$(window).on('popstate', function(e) {
		console.log(e);
		$('.col3').remove();
		$('.col2').removeClass('overlayed');
	});
	$(window).on('pushstate', function(e) {
		console.log(e);
	});
	
	resizeCol3();
	$(window).on('resize', resizeCol3);
});


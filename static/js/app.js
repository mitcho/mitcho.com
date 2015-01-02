function closeOverlay(part) {
	// part: research | projects
	console.log(part);
	
	var $ = Zepto;

	// if the desired 'part' is not what is present, reload it:
	if ( !$('.col2').find('.post.' + part).length ) {
		$('.col2').remove();
		load('/' + part + '/index.overlay.html', 'col2');
	}

	var overlay = $('.col3').addClass('lower slidedown');
	setTimeout(function() {
		overlay.remove();
	}, 1.5 * 1000)
	$('body').removeClass('overlayed');
}

function load(overlayUrl, type, cb) {
	if (type != 'col2' && type != 'col3')
		throw Error('load: type must be col2 or col3');

	var $ = Zepto;
	$.get(overlayUrl, function (data, status, xhr) {
		console.log('load');
		var parsed = $(data);
		var title = parsed.find('title').text();
		
		// transition!
		var section = parsed.find('overlay > section');
		section.addClass('slideup ' + type);
		
		if (type == 'col2') {
			$('.site-header').after(section);
		} else { // col3
			$('.site-footer').before(section);
			$('body').addClass('overlayed');			
		}

		cb();
	}, 'html');
}

function loadOverlay(slug) {
	var $ = Zepto;

	var overlayUrl = '/research/' + slug + '.overlay.html';
	console.log('loadOverlay');

	var oldOverlay = $('.col3').addClass('lower');

	load(overlayUrl, 'col3', function() {
		setTimeout(function() {
			console.log('remove overlay');
			oldOverlay.remove();
		}, 1.5 * 1000);
	});
}

function resizeCol3() {
	var $ = Zepto;
	var col3 = $('.col3');
	if ( !col3.length )
		return;
	var offset = col3.offset();
	var needed = $(window).width() - offset.left - 880;
	if (needed > 0)
		col3.css('padding-right', needed);
	else
		col3.css('padding-right', 0);
}

Zepto(function($) {
	// make the entire research entry a tap target:
	$('.research-group li').on('click', function(e) {
		// find the closest target:
		var target = $(e.target).closest('a,li');
		if ( target.index(this) > -1 ) {
			var a = target.find('.title');
			History.pushState(null, a.text(), a.attr('href'));
		}
		e.preventDefault();
	});
	
	// reroute 'a' in sections through History.pushState
	$('section').on('click', 'a', function(e) {
		var a = $(e.currentTarget);
		History.pushState(null, a.text(), a.attr('href'));
	});
	
	// catch the actual pushState
	History.Adapter.bind(window, 'statechange', function(e) {
		var State = History.getState();
		console.log(State.url);
		var match = State.url.match(/^(http:\/\/mitcho.com|http:\/\/127.0.0.1:4000)?\/(research|projects)\/((.*)\.html)?$/);
		if ( match == null || !match.length )
			return;

		var part = match[2];
		var slug = match[4];
		if (part == 'research' && slug != null)
			loadOverlay(slug);
		else if (slug == null)
			closeOverlay(part);
		else
			return;
	});
	
	resizeCol3();
	$(window).on('resize', resizeCol3);
});


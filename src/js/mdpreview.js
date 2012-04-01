Modernizr.load({
	test: (window.location.hash.substr(1, 3) == 'md/'), 
	yep: ['../src/js/showdown.js', '../src/js/plates.js', '../src/js/ender.min.js'],
	complete: function() {
		if (window.ender) {
			var $ = ender.noConflict(),
				post = window.location.hash.substr(4);

			$.ajax({
				url: post + '.md',
				method: 'get',
				type: 'html',
				success: function(res) {
				
					var converter = new Showdown.converter();
					$('#markdown').html(converter.makeHtml(res));
				
				}
			});
		}
	}
})
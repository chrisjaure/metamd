(function() {

	var $;
	Modernizr.load({
		test: (window.location.hash.substr(1, 3) == 'md/'), 
		yep: ['../src/js/showdown.js', '../src/js/ender.min.js', '../src/parse_file.js'],
		complete: function() {
			if (window.ender) {
				var post = window.location.hash.substr(4);
				$ = ender.noConflict(),

				$.ajax({
					url: post + '.md?'+Date.now(),
					method: 'get',
					type: 'html',
					success: function(res) {
					
						renderMarkdown(parseMarkdown(res));
					
					}
				});
			}
		}
	});

	function renderMarkdown(fields) {

		var converter = new Showdown.converter();
		$('#markdown').html(converter.makeHtml(fields.body));
		delete fields.body;

		Object.keys(fields).forEach(function(key) {

			var $el = $(key);
			if ($el[0]) {
				$el.text(fields[key]);
			}

		});

	}

})();
(function() {

	var $;
	Modernizr.load({
		test: (window.location.hash.substr(1, 3) == 'md/'), 
		yep: ['../src/js/showdown.js', '../src/js/ender.min.js'],
		complete: function() {
			if (window.ender) {
				var post = window.location.hash.substr(4);
				$ = ender.noConflict(),

				$.ajax({
					url: post + '.md?'+Date.now(),
					method: 'get',
					type: 'html',
					success: function(res) {
					
						var parsed = parseMarkdown(res);
						renderMarkdown(parsed.meta, parsed.markdown);
					
					}
				});
			}
		}
	});

	function parseMarkdown (text) {

		var
			parsed = text.split(/[\n\r]/),
			meta = parsed[0],
			markdown = parsed.slice(1).join('\n');
			
		try {
			meta = JSON.parse('{'+meta+'}');
		}
		catch (e) {
			meta = {};
			markdown = text;
		}

		return {
			meta: meta,
			markdown: markdown
		};
	}

	function renderMarkdown(meta, markdown) {

		var converter = new Showdown.converter();
		$('#markdown').html(converter.makeHtml(markdown));

		Object.keys(meta).forEach(function(key) {

			var $el = $(key);
			if ($el[0]) {
				$el.text(meta[key]);
			}

		});

	}

})();
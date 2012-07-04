(function(exports) {

	function parseMarkdown (text) {

		var	fields = {},
			body;
			
		text = text.replace(/\r\n|\r/g, '\n');
		body = text.replace(/=+\n+([\s\S]*)\n\n/, function(match, meta) {

			meta.split('\n').forEach(function( field ) {

				var parsed = field.split(':');
				fields[parsed[0]] = parsed[1].trim();

			});

			return '=' + '\n\n';

		});

		fields.body = body;

		return fields;
	}


	exports.parseMarkdown = parseMarkdown;

})(typeof module != 'undefined' ? module.exports : this);
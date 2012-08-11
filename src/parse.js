/*

parse.js
================================================================================

This function will parse meta data out of markdown files in the following format

```
Title
=====
meta1: value1
meta2: value2
[...]

This is the content.
```

Returns an object with meta keys and values, plus `body` which contains the
Markdown.

*/

var meta_match = new RegExp('=+\\n(\\S[\\s\\S]*?)(?:\\n\\n|\\s*$)');
/*
	=+				find one or more =
	\\n				one newline
	(				capturing group 1
		\\S			one non-whitespace character
		[\\s\\S]*?	any amount of any charater (non-greedy)
	)
	(?:				non-capturing group
		\\n\\n		two newlines
		|			or
		\\s*$		any amount of whitespace at end of line
	)
*/

module.exports = function (text) {

	var	fields = {},
		body;
		
	text = text.replace(/\r\n|\r/g, '\n');
	body = text.replace(meta_match, function(match, meta) {

		meta.split('\n').forEach(function( field ) {

			var parsed = field.split(':');
			fields[parsed[0]] = (parsed[1] || '').trim();

		});

		return '===\n\n';

	});

	fields.body = body;

	return fields;

};
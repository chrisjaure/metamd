/*

parse.js
================================================================================

This function will parse meta data out of markdown files in the following format

```
Optional title
==============
meta1: value1
meta2: value2
[...]

This is the content.
```

Returns an object with meta keys and values, plus `body` which contains the
Markdown.

*/

var meta_group_match = new RegExp(

	'^'				+	// start of string
	'('				+	// capturing group 1
		'\\S'		+	// one non-whitespace character
		'[\\s\\S]*?'+	// any amount of any character (non-greedy)
	')'				+
	'('				+	// capturing group 2
		'\\n\\n'	+	// two newlines
		'|'			+	// or
		'\\s*$'		+	// any amount of whitespace at end of string
	')'

);

var meta_parse_match = new RegExp(

	'^'				+	// start of line
	'('				+	// capturing group 1
		'[a-zA-Z0-9_]*?'	+	// any amount of non-whitespace characters (non-greedy)
	')'				+
	'\\s*?:\\s*?'	+	// colon surrounded by optional whitespace (non-greedy)
	'('				+	// capturing group 2
		'[\\s\\S]*?'+	// any amount of any character (non-greedy)
	')'				+
	'(?:'			+	// non-capturing group
		'\\n'		+	// newline
		'|'			+	// or
		'$'			+	// end of line
	')',
	'gm'
);

module.exports = function (text) {

	var	fields = {},
		body;
		
	text = text.replace(/\r\n|\r/g, '\n');
	body = text.replace(meta_group_match, function(match, meta_group, end) {

		meta_group = meta_group.replace(meta_parse_match, function(meta_pair, meta_key, meta_value) {

			fields[meta_key] = (meta_value || '').trim();
			return '';

		});

		return (meta_group + end).replace(/\n\n\n$/, '\n\n');

	});

	fields._body = body;

	return fields;

};
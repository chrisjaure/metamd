var exports = module.exports = metamd;

function metamd (text, opts) {
	var parsed = metamd.parse(text);

	opts = opts || {};

	if (opts.render || typeof opts.render == 'undefined') {
		parsed.body = metamd.render(parsed.body);
	}

	return parsed;
}

metamd.parse = require('./parse');
metamd.render = require('./render');
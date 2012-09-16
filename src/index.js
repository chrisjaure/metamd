var exports = module.exports = function (markdown) {

	return new Metamd(markdown);

};

var Metamd = function(markdown) {

	var parsed = this._parse(markdown);
	this.markdown = parsed._body;
	delete parsed._body;
	this.data = parsed;

};

Metamd.prototype.getHtml = function() {

	if (!this.html) {
		this.html = this._render(this.markdown);
	}

	return this.html;

};

Metamd.prototype.getMarkdown = function() {

	return this.markdown;

};

Metamd.prototype.getData = function(key) {

	if (key) {
		return this.data[key];
	}

	return this.data;

};

Metamd.prototype._parse = require('./parse');
Metamd.prototype._render = require('./render');
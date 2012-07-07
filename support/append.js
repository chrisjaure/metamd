(function (name, definition) {

	if (typeof define == 'function') {
		define(definition)
	}
	else if (typeof module !='undefined') {
		module.exports = definition()
	}
	else {
		this[name] = definition()
	}

})( 'lighter', function () {

	return require('/src/index.js');

});
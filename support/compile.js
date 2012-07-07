#!/usr/bin/env node
	 
var fs = require('fs');
var browserify = require('browserify');

var bundle = browserify({
	entry : __dirname + '/../src/lighter.js',
	exports: 'require'
});
 
function write () {
	var src = bundle.bundle();
	fs.writeFile(__dirname + '/../lighter.js', src, function () {
		console.log(Buffer(src).length + ' bytes written');
	});
}

bundle.on('bundle', write);
write();
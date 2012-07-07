#!/usr/bin/env node

var
	fs = require('fs'),
	browserify = require('browserify'),

	bundle = browserify({
		entry : __dirname + '/../src/index.js',
		exports: 'require',
		watch: (process.argv[2] == '-w')
	});

function write () {
	var src = bundle.bundle();
	fs.writeFile(__dirname + '/../lighter.js', src, function () {
		console.log(Buffer(src).length + ' bytes written');
	});
}

bundle.on('bundle', write);
write();
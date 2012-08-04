#!/usr/bin/env node

var
	fs = require('fs'),
	uglify = require('uglify-js'),
	browserify = require('browserify'),
	loadify = require('loadify'),

	bundle = browserify({
		require: __dirname + '/../src/index.js',
		watch: (process.argv[2] == '-w')
	});

// try to enable different methods of loading
bundle.use(loadify({
	module: './src/index.js',
	name: 'metamd'
}));

function write () {

	var
		src = bundle.bundle(),
		ast = uglify.parser.parse(src),
		minified;

	ast = uglify.uglify.ast_mangle(ast);
	ast = uglify.uglify.ast_squeeze(ast);
	minified = uglify.uglify.gen_code(ast);

	fs.writeFile(__dirname + '/../metamd.client.min.js', minified, function () {
		console.log('metamd.client.min.js: ' + Buffer(minified).length + ' bytes written.');
	});

	fs.writeFile(__dirname + '/../metamd.client.js', src, function () {
		console.log('metamd.client.js: ' + Buffer(src).length + ' bytes written.');
	});

}

bundle.on('bundle', write);
write();
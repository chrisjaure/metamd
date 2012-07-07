#!/usr/bin/env node

var
	fs = require('fs'),
	uglify = require('uglify-js'),
	browserify = require('browserify'),

	bundle = browserify({
		entry : __dirname + '/../src/index.js',
		watch: (process.argv[2] == '-w')
	});

// try to enable different methods of loading
bundle.append(fs.readFileSync(__dirname + '/append.js'));

function write () {

	var
		src = bundle.bundle(),
		ast = uglify.parser.parse(src),
		minified;

	ast = uglify.uglify.ast_mangle(ast);
	ast = uglify.uglify.ast_squeeze(ast);
	minified = uglify.uglify.gen_code(ast);

	fs.writeFile(__dirname + '/../lighter.client.min.js', minified, function () {
		console.log('lighter.client.min.js: ' + Buffer(minified).length + ' bytes written.');
	});

	fs.writeFile(__dirname + '/../lighter.client.js', src, function () {
		console.log('lighter.client.js: ' + Buffer(src).length + ' bytes written.');
	});

}

bundle.on('bundle', write);
write();
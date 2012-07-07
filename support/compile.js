#!/usr/bin/env node

var
	fs = require('fs'),
	browserify = require('browserify'),

	bundle = browserify({
		entry : __dirname + '/../src/index.js',
		watch: (process.argv[2] == '-w')
	});

// try to enable different methods of loading
bundle.append(fs.readFileSync(__dirname + '/append.js'));

function write () {
	var src = bundle.bundle();
	fs.writeFile(__dirname + '/../lighter.client.js', src, function () {
		console.log(Buffer(src).length + ' bytes written');
	});
}

bundle.on('bundle', write);
write();
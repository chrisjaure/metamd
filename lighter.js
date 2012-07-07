!function (name, context, definition) {
  if (typeof module !== 'undefined') module.exports = definition(name, context);
  else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
  else context[name] = definition(name, context);
}('lighter', this, function (name, context) {


 function require(p) {
   var path = require.resolve(p)
     , mod = require.modules[path];
   if (!mod) throw new Error('failed to require "' + p + '"');
   if (!mod.exports) {
     mod.exports = {};
     mod.call(mod.exports, mod, mod.exports, require.relative(path));
   }
   return mod.exports;
 }

 require.modules = {};

 require.resolve = function (path) {
   var orig = path
     , reg = path + '.js'
     , index = path + '/index.js';
   return require.modules[reg] && reg
     || require.modules[index] && index
     || orig;
 };

 require.register = function (path, fn) {
   require.modules[path] = fn;
 };

 require.relative = function (parent) {
   return function(p){
     if ('.' != p[0]) return require(p);

     var path = parent.split('/')
       , segs = p.split('/');
     path.pop();

     for (var i = 0; i < segs.length; i++) {
       var seg = segs[i];
       if ('..' == seg) path.pop();
       else if ('.' != seg) path.push(seg);
     }

     return require(path.join('/'));
   };
 };

 require.alias = function (from, to) {
   var fn = require.modules[from];
   require.modules[to] = fn;
 };


 require.register("parse.js", function(module, exports, require){
   /*

   parser.js
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

   module.exports = function (text) {

   	var	fields = {},
   		body;
   		
   	text = text.replace(/\r\n|\r/g, '\n');
   	body = text.replace(/=+\n+([\s\S]*)\n\n/, function(match, meta) {

   		meta.split('\n').forEach(function( field ) {

   			var parsed = field.split(':');
   			fields[parsed[0]] = parsed[1].trim();

   		});

   		return '=' + '\n\n';

   	});

   	fields.body = body;

   	return fields;

   }
 }); // module: parse.js

 require.register("lighter.js", function(module, exports, require){
   var exports = module.exports = {};

   exports.parse = require('./parse');
 }); // module: lighter.js

 require.alias("./lighter.js", "lighter");

  return require('lighter');
});

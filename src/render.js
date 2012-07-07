/*

render.js
================================================================================

Render Markdown. This just uses marked.

*/

var marked = require('marked');

module.exports = function (text) {

	return marked(text);

}
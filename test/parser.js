(function(expect, parseMarkdown){

	describe('Parser', function() {

		describe('parseMarkdown', function() {

			var page = 'Page 1\r\n======\ntitle: page1.md\rtags:test\n\nPage 1';

			it('should parse the body', function() {

				var data = parseMarkdown(page);

				expect(data).to.have.property('body').that.equal('Page 1\n=\n\nPage 1');
			});

			it('should parse the meta data', function() {

				var data = parseMarkdown(page);
				expect(data).to.have.property('title').that.equal('page1.md');
				expect(data).to.have.property('tags').that.equal('test');

			});
		});

	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof parseMarkdown == 'undefined' ? require('../src/parser.js').parseMarkdown : parseMarkdown
);
(function(expect, parse){

	describe('Lighter', function() {

		describe('parse', function() {

			var page = 'Page 1\r\n======\ntitle: page1.md\rtags:test\n\nPage 1\n\ntest';

			it('should parse the body', function() {

				var data = parse(page);

				expect(data).to.have.property('body').that.equal('Page 1\n=\n\nPage 1\n\ntest');
			});

			it('should parse the meta data', function() {

				var data = parse(page);
				expect(data).to.have.property('title').that.equal('page1.md');
				expect(data).to.have.property('tags').that.equal('test');

			});
		});

	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof lighter == 'undefined' ? require('../src').parse : lighter.parse
);
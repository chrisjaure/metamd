(function(expect, test){

	describe('metamd', function() {

		describe('getData', function() {

			it('should return an object with metadata', function() {

				var parsed = test('tags: test');
				expect(parsed.getData()).to.deep.equal({ tags: 'test' });

			});

			it ('should return a key value if a key is passed in', function() {

				var parsed = test('tags: test');
				expect(parsed.getData('tags')).to.equal('test');

			});

		});

		describe('getMarkdown', function() {

			it('should return markdown', function() {

				var parsed = test('Page 1\n======\n\nPage 1\n\ntest');
				expect(parsed.getMarkdown()).to.equal('Page 1\n======\n\nPage 1\n\ntest');

			});

		});

		describe('getHtml', function() {

			it('should return html', function() {

				var parsed = test('Page 1\n===\n\nPage 1\n\ntest');
				expect(parsed.getHtml()).to.equal('<h1>Page 1</h1>\n<p>Page 1\n\n</p>\n<p>test</p>\n');

			});

		});

		describe('_parse', function() {

			var pages = [
				{
					it: 'should parse meta data at the top',
					md: 'test: test',
					expected: {
						test: 'test',
						_body: ''
					}
				},
				{
					it: 'should parse the meta data preceded by other markdown',
					md: 'Page 1\r\n======\ntitle: page1.md\rtags:test\n\nPage 1\n\ntest',
					expected: {
						title: 'page1.md',
						tags: 'test',
						_body: 'Page 1\n======\n\nPage 1\n\ntest'
					}
				},
				{
					it: 'should parse the meta data even if there is no content',
					md: 'Page 1\n======\ntitle: page1',
					expected: {
						title: 'page1',
						_body: 'Page 1\n======\n'
					}
				},
				{
					it: 'should not parse the content as meta data',
					md: 'Page 1\n===\n\nFact: this is not meta',
					expected: {
						_body: 'Page 1\n===\n\nFact: this is not meta'
					}
				},
				{
					it: 'should parse only alphanumeric keys',
					md: 'meta_data: meta data\nThe following list is not meta data: one, two, three.',
					expected: {
						meta_data: 'meta data',
						_body: 'The following list is not meta data: one, two, three.'
					}
				}
			];

			// generate the tests
			pages.forEach(function(page) {

				it(page.it, function() {
					var data = test('')._parse(page.md);
					expect(data).to.deep.equal(page.expected);
				});

			});


		});

		describe('_render', function() {

			var page = 'Page 1\n===\n\nPage 1\n\ntest';

			it('should render markdown', function() {

				var html = test('')._render(page);
				expect(html).to.equal('<h1>Page 1</h1>\n<p>Page 1\n\n</p>\n<p>test</p>\n');

			});

		});

	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof metamd == 'undefined' ? require('../src') : metamd
);
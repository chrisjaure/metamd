(function(expect, test){

	describe('metamd', function() {

		describe('parse', function() {

			var pages = [
				{
					it: 'should parse the meta data',
					md: 'Page 1\r\n======\ntitle: page1.md\rtags:test\n\nPage 1\n\ntest',
					expected: {
						title: 'page1.md',
						tags: 'test',
						body: 'Page 1\n===\n\nPage 1\n\ntest'
					}
				},
				{
					it: 'should parse the meta data even if there is no content',
					md: 'Page 1\n======\ntitle: page1',
					expected: {
						title: 'page1',
						body: 'Page 1\n===\n\n'
					}
				},
				{
					it: 'should not parse the content as meta data',
					md: 'Page 1\n===\n\nFact: this is not meta',
					expected: {
						body: 'Page 1\n===\n\nFact: this is not meta'
					}
				}
			];

			// generate the tests
			pages.forEach(function(page) {

				it(page.it, function() {
					var data = test.parse(page.md);
					expect(data).to.deep.equal(page.expected);
				});

			});


		});

		describe('render', function() {

			var page = 'Page 1\n===\n\nPage 1\n\ntest';

			it('should render markdown', function() {

				var html = test.render(page);
				expect(html).to.equal('<h1>Page 1</h1>\n<p>Page 1\n\n</p>\n<p>test</p>\n');

			});

		});

			
		it('should parse and render markdown', function() {

			var parsed = test('Page 1\n=====');
			expect(parsed.body).to.equal('<h1>Page 1</h1>\n');

		});

		it('should not render markdown when instructed to do so', function() {

			var parsed = test('Page 1\n=====', { render: false });
			expect(parsed.body).to.equal('Page 1\n=====');

		});


	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof metamd == 'undefined' ? require('../src') : metamd
);
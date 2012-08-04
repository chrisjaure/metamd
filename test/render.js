(function(expect, render){

	describe('MetaMD', function() {

		describe('render', function() {

			var page = 'Page 1\n===\n\nPage 1\n\ntest';

			it('should render markdown', function() {

				var html = render(page);

				expect(html).to.equal('<h1>Page 1</h1>\n<p>Page 1\n\n</p>\n<p>test</p>\n');
			});

		});

	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof metamd == 'undefined' ? require('../src').render : metamd.render
);
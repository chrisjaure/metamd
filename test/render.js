(function(expect, render){

	describe('Lighter', function() {

		describe('render', function() {

			var page = 'markdown';

			it('should render markdown', function() {

				var html = render(page);

				expect(html).to.equal('<p>markdown</p>\n');
			});

		});

	});

})(
	typeof chai == 'undefined' ? require('chai').expect : chai.expect,
	typeof lighter == 'undefined' ? require('../src/lighter').render : lighter.render
);
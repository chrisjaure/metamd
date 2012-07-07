lighter
=======

Parse and render Markdown.

Installation
------------

### Node ###
	
	clone [url] && cd lighter
	npm link

### Client ###

	<script type="text/javascript" src="lighter.client.min.js"></script>


Example
-------

```
var fs = require('fs');
var lighter = require('lighter');

var parsed = lighter.parse(fs.readFileSync('./example/page1.md', 'utf-8'));
console.log(parsed);
console.log(lighter.render(parsed.body));
```

Will result in:
```
> { title: 'page1.md',
    tags: 'test',
    body: 'Page 1\n=\n\nThis is a _test_.\n\n```\nThis is another test\n```' }

> <h1>Page 1
  </h1>
  <p>This is a <em>test</em>.

  </p>
  <pre><code>This is another test</code></pre>

```


var fs = require('fs');
var lighter = require('./src');
var parsed = lighter.parse(fs.readFileSync('./example/page1.md', 'utf-8'));
console.log(parsed);
console.log(lighter.render(parsed.body));


Usage
-----

`lighter.parse(<markdown>)` - returns an object with meta data parsed out of the markdown. There will be a `body` key that contains the markdown.

`lighter.render(<markdown>)` - returns html rendered using marked.


Test
----

Testing is done with mocha and chai and can be run on the server or client.

### Node ###

	npm test

### Client ###

Maybe start a server, then navigate to `test/browser/index.html`.



Goals
-----

- Preview mardown files in the browser
- Completely client side
- Integrate with template

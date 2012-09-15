metamd
======

Parse meta Markdown data and render in the browser or server. You can add meta data in the format of

```
Optional Heading
================
title: page1.md
tags: test

The two newlines preceding this paragraph are important.
```

and automatically parse it out before rendering the markdown.


Installation
------------

### Node ###
	
	npm install metamd

### Client ###

	<script type="text/javascript" src="metamd.client.min.js"></script>


Example
-------

```
var fs = require('fs');
var metamd = require('metamd');

var parsed = metamd.parse(fs.readFileSync('./example/page1.md', 'utf-8'));
console.log(parsed);
console.log(metamd.render(parsed.body));
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


Usage
-----

`metamd(<markdown>, [opts])` - returns an object with meta data and the markdown rendered in the `body` key. `opts` can be an object. Right now the only option is `render` which defaults to `true`.

`metamd.parse(<markdown>)` - returns an object with meta data and the markdown body. The `body` key contains the markdown.

`metamd.render(<markdown>)` - returns html rendered using marked.

Meta data keys should be alphanumneric plus underscores. Nothing else will be parsed.

Test
----

Testing is done with mocha and chai and can be run on the server or client. Remember to install the dev dependencies before running the tests.

### Node ###

	npm test

### Client ###

Maybe start a server, then navigate to `test/browser/index.html`.


Compiling
---------

If you make changes, you need to recompile for browser usage. After you install the dev dependencies, it's easy:

  npm run compile

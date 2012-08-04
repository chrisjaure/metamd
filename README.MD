metamd
======

Parse meta Markdown data and render in the browser or server. You can add meta data in the format of

```
Page 1
======
title: page1.md
tags: test

This is a _test_.
```

and automatically parse it out before rendering the markdown.


Installation
------------

### Node ###
	
	clone [url] && cd metamd
	npm link

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

`metamd.parse(<markdown>)` - returns an object with meta data parsed out of the markdown. There will be a `body` key that contains the markdown.

`metamd.render(<markdown>)` - returns html rendered using marked.


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

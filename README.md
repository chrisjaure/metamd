metamd
======

Parse meta Markdown data and render in the browser or server. Transform this:

```markdown
Optional Heading
================
title: page1.md
tags: test

The two newlines preceding this paragraph are important.
```

into this:

```javascript
{ title: 'page1.md',
  tags: 'test',
  body: '<h1>Optional Heading</h1><p>The two newlines preceding this paragraph are important.</p>' }
```


Installation
------------

### Node ###
	
	npm install metamd

### Client ###

	<script type="text/javascript" src="metamd.client.min.js"></script>


Example
-------

```javascript
var fs = require('fs');
var metamd = require('metamd');

var parsed = metamd.parse(fs.readFileSync('./example/page1.md', 'utf-8'));
console.log(parsed);
console.log(metamd.render(parsed.body));
```

Will result in:
```javascript
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

### `metamd(<markdown>, [opts])` ###

Returns an object with meta data and the *rendered* markdown in the `body` key. Options:

- `render` - Defaults to true. Render the markdown as html.

### `metamd.parse(<markdown>)` ###

Returns an object with meta data and the *unrendered* markdown in the `body` key.

### `metamd.render(<markdown>)` ###

Returns html rendered using marked.

Meta data keys should be alphanumneric plus underscores. Nothing else will be parsed. Also be careful not to use reserved words or `body` as keys.


Test
----

Testing is done with mocha and chai and can be run on the server or client. Remember to install the dev dependencies before running the tests.

### Node ###

	npm test

### Client ###

Navigate to `test/browser/index.html`.


Compiling
---------

If you make changes, you need to recompile for browser usage. After you install the dev dependencies, it's easy:

```
npm run compile
```
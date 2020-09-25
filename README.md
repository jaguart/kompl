# kompl

A website navigation widget - Guide your users through a curated compilation of pages on your site.

## Installation

* Head over the release page - download the latest version .zip file
* Unzip the contents into a folder that is accessible from your website - e.g. public/
* Add `<script src='/kompl.bundle.js'></script>` into the `<head>` on all pages on your site.

## Usage

Add controls into your pages that play your compilations:

```html
  <button onclick="$kompl.play(
    title:'My curated compilation',
    slugs: [
      '/p1/',
      '/p5/',
      '/p7/',
    ],
    style: 'compact',
    )"Show me!</button>
```

## Examples

See:

* [Using the STYLE arguement](../blob/master/doc/example-style-001.md)

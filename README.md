# kompl

A website navigation widget - guide your users through a curated compilation of pages on your site.

## Installation

* Head over to [releases] - download the .zip file
* Unzip the contents into a folder that is accessible from your website - e.g. public/
* Add `<script src='/kompl.bundle.js'></script>` into the `<head>` on all pages on your site, *after* **JQuery**J

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

* [Using the STYLE argument](blob/master/doc/example-style-001.md)

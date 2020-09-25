# kompl

A website navigation widget - guide your users through a curated compilation of pages on your site.

*I will get a picture here, when I figure out how-to*

## Installation

* Head over to [releases](releses) - download the .zip file
* Unzip the contents into a folder that is accessible from your website - e.g. public/
* Add `<script src='/kompl.bundle.js'></script>` into the `<head>` on all pages on your site, **after JQuery**

## Usage

Add controls into your pages that play your compilations:

```html
  <button onclick="
    $kompl.play(
      title:'My curated compilation',
      slugs: [
        '/p1/',
        '/p5/',
        '/p7/',
      ],
      style: 'compact',
    )
    ">Show me!</button>
```

## Documentation and Examples

* [Using OPTIONS ](doc/example-options-001.md)
* [Using STYLE ](doc/example-style-001.md)

## Credits

* Inspired by conversations with *Malcom - ZAM* - https://healthzam.com/

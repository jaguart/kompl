# kompl

A website navigation widget - guide your users through a curated compilation of pages on your site.

*I will get a picture here, when I figure out how-to*

## Installation

* Head over to [releases](releses) - download the `.zip` file
* Unzip the contents into a folder that is accessible from your website - e.g. `public/`
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

You can see the widget in operation by clicking on the **buttons** on this page: https://normus.totahi.com/tags

You can read the documentation and examples here:
* [Anatomy of the Widget](doc/widget-anatomy.md)
* [Using the OPTIONS argument](doc/example-options.md)
* [Using the STYLE argument](doc/example-style.md)
* [Roadmap - planned features](doc/roadmap.md)

## Credits

* Inspired by conversations with *Malcom - ZAM* - https://healthzam.com/

## Author

Jeff, aka *jaguart* on Github. https://jaguart.tech - dabbler. This is my first playground using TypeScript in the Node-verse.

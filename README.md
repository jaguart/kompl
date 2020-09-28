# kompl

A website navigation widget. Guide your users through a curated compilation of pages on your site.

![Kompilation in Action](doc/kompl-example-001.jpg)

## Installation

* Head over to [releases](https://github.com/jaguart/kompl/releases) - download the `.zip` file
* Unzip the contents into a folder that is accessible from your website - e.g. `public/`
* Add `<script src='/kompl.bundle.js'></script>` into the `<head>` on all pages on your site, **after JQuery**

## Usage

Add controls into your pages that play your compilations:

```html
  <button onclick="
    $kompl.play(
      title:'Jeffs curated Kompilation',
      slugs: [
        '/p1/',
        '/p5/',
        '/p7/',
      ],
      style: 'clean',
      size: 'large',
      place: 'bc',
      show: 80%,
    )
    ">Show me!</button>
```

## Documentation and Examples

You can see the widget in operation by clicking on the **buttons** on this page: https://normus.totahi.com/tags

You can read the documentation and examples here:
* [Anatomy of Kompl](doc/widget-anatomy.md) - taxonomy and overview.
* [Kompl Usage Examples](doc/example-usage.md) - learn by example.
* [Using the STYLE argument](doc/example-style.md) - named preset options.
* [Using the SHOW argument](doc/example-show.md) - positioning Kompl on the pages.
* [Using the OPTIONS argument](doc/example-options.md) - details of all available options.
* [Roadmap - planned features](doc/widget-roadmap.md) - bugx, features, enhancments.

## Credits

* Inspired by conversations with *Malcom - ZAM* - https://healthzam.com/

## Author

Jeff, aka *jaguart* on Github. https://jaguart.tech - dabbler.

This is my first playground using TypeScript in the Node-verse. Canonical https://github.com/jaguart/kompl

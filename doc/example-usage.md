# Kompl - Usage

## Installation

* Assuming the Kompl file have been installed on your web-server, with the correct permissions, and are accessible at `/asset`
* Assuming that **JQuery** is included ABOVE the following.

```html
<script src="/asset/kompl.bundle.js"></script>
```

## Simple Embedded Compilation

```html
<button onclick="
  $kompl.play({
    title: 'My Curated Kompilation',
    slugs: [
      '/kompl/',
      '/page1/',
      '/page3/',
      '/page7/',
    ],
  })
">Show me!</button>
```

You can STYLE the widget using the STYLE argument:
```html
<button onclick="
  $kompl.play({
    title: 'My Curated Kompilation',
    slugs: [
      '/kompl/',
      '/page1/',
      '/page3/',
      '/page7/',
    ],
    style: 'clean',
  })
">Show me! clean</button>
```

Current preset STYLE values: `'rich' | 'choice' | 'clean' | 'naked'`

See [Using the STYLE argument](example-style.md) for more detail.


You can set OPTIONS for the widget:
```html
<button onclick="
  $kompl.play({
    title: 'My Curated Kompilation',
    slugs: [
      '/page1/',
      '/page3/',
      '/page7/',
    ],
    options: {
      size: 'large',
      place: 'bc',
    }
  })
">Show me! large-bc</button>
```

See [Using the OPTIONS argument](example-options.md) for more OPTIONS.


### User Preferences

If you give your users access to the widget controls, they can change the placement and size of the widget.

These User preferences will take precedence over your STYLE or OPTIONS settings.

You can call  `$kompl.reset()` when your document has loaded to clear User saved preferences.


## Multiple Compilations

You can use JavaScript to manage several compilations on the same page. For example you might:

```html
<head>
<script>

var $cars = [
  '/mercedes/',
  '/porsche/',
  '/2cv/',
]

var $fruit = [
  '/apples/',
  '/peaches/',
  '/cream/',
]

// A wrapper function that calls $kompl.play with the specified $list
function play_kompl( $list ) {
  $kompl.play({
    title: 'My favourite things',
    $list,
    style: 'clean',
  })
}

// Calling $kompl.options() is OPTIONAL :)
// You can set options: and|or style: in the call to $kompl.play()
// Set options for ALL compilations when document has loaded
document.addEventListener('DOMContentLoaded', function (ev) {
  window.$kompl.options({
    place: 'br',
    size: 'large',
    homer: true,
    placer: true,
    sizer: true,
    closer: true,
  });
})

</script>
</head>
<body>

<a href='#' class="my-button" onclick="play_kompl($cars)">Show me Cars</a><br>
<a href='#' class="my-button" onclick="play_kompl($fruit)">Show me Food</a><br>

</body>

```

---

### Documentation
* [Kompl README](doc/README.md) - Introduction and installation.
* [Anatomy of Kompl](doc/widget-anatomy.md) - Taxonomy and overview.
* [Kompl Usage Examples](doc/example-usage.md) - Learn by example.
* [Using the STYLE argument](doc/example-style.md) - Named preset options.
* [Using the SHOW argument](doc/example-show.md) - Positioning Kompl on the pages.
* [Using the OPTIONS argument](doc/example-options.md) - Details of all available options.
* [Roadmap - planned features](doc/widget-roadmap.md) - bugs, features, enhancments.

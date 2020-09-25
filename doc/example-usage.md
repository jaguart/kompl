# Kompl - Example Usage

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

Current preset STYLEs: rich | choice | clean | naked
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

Note that any USER saved preferences will take precedence over STYLE or OPTIONS.

You can reset USER preferences by calling `$kompl.reset()` after your document has loaded.


See [Using the OPTIONS argument](example-options.md) to see all available **options**.

## Multiple Compilations

You can use JavaScript to manage several compilations on the same page.

For example you might:

```html
<head>

<script>

var $cars = [
  '/mercedes/',
  '/bently/',
  '/porsche/',
  '/2cv/',
]

var $fruit = [
  '/apples/',
  '/pears/',
  '/peaches/',
  '/cream/',
]

function play_kompl( $list ) {
  $kompl.play({
    title: 'My favourite things',
    $list,
    style: 'clean',
  })
}

</script>

</head>

<body>
  <a href='#' class="my-button" onclick="play_kompl($cars)">Show me Cars</a><br>
  <a href='#' class="my-button" onclick="play_kompl($fruit)">Show me Food</a><br>
</body>

```

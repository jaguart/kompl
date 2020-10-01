# Kompl - the SHOW argument

The SHOW argument is used for fine-control of the widget placement.

There are two types of **show:**:
* percentage: `show: 80%` - the widget will show when the User has scrolled to 80% of the document.
* element id: `show:'#here'` - the widget will be placed inside the element with `<element id='here'>...`

Note that there is an interaction between SHOW and the User PLACE preferences. When SHOW-element is in effect, User placement is not available.

## Show - Percent scrolled

In this example, the Kompilation widget will only be displayed when the User has scrolled to 75% in the document.

```html
  <a href='#' onclick="
    $kompl.play({
      title: 'Jeffs Curated Collection',
      slugs: [
        '/page-3/',
        '/page-5/',
        '/page-7/',
      ],
      show: 75%,
    })
  ">Show me!</a>
```

The following examples are all valid values for `show`:
* `show: 90`
* `show: 90%`
* `show: 0.90`
* `show: 10`
* `show: 10%`
* `show: 0.10`


## Show - Inside Element

In this example, the Kompilation widget will be added at the end of the `#show-me` DIV:

```html
  <a href='#' onclick="
    $kompl.play({
      title: 'Jeffs Curated Collection',
      slugs: [
        '/page-3/',
        '/page-5/',
        '/page-7/',
      ],
      show: '#show-here',
    })
  ">Show me!</a>
```
and then in **ALL** your documents...
```html
  <p>Content and interesting details.</p>
  <div id='show-here'>See more: </div>
  <p>Disclaimer and Copyright, or other additional detail</p>
```

---

### Documentation

* [Kompl README](../README.md) - Overview and installation.
* [Anatomy of Kompl](widget-anatomy.md) - Taxonomy and overview.
* [Kompl Usage Examples](example-usage.md) - Learn by example.
* [The STYLE argument](example-style.md) - Named preset options.
* [The SHOW argument](example-show.md) - Positioning Kompl on the pages.
* [The OPTIONS argument](example-options.md) - Details of all available options.
* [The NEXT/PREV arguments](example-label.md) - Details of NEXT / PREV arguments.
* [Roadmap - planned features](widget-roadmap.md) - bugs, features, enhancments.

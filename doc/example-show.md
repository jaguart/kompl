# Kompl - the SHOW argument

The SHOW argument is used for fine-control of the widget placement.

There are two types of **show:**:
* percentage: `show: 80%` - the widget will show when the User has scrolled to 80% of the document.
* element id: `show:'#here'` - the widget will be placed inside the element with `<element id='here'>...`

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
      options: {
        show: 75%,
      }
    })
  ">Show me!</a>
```

The following are all valid values for `show`:
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
      options: {
        show: '#show-me',
      }
    })
  ">Show me!</a>
```
and then in **ALL** your documents...
```html
  <p>Content and interesting details.</p>
  <div id='show-me'>See more: </div>
  <p>Disclaimer and Copyright, or other additional detail</p>
```

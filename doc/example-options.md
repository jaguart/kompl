# Kompl - the OPTIONS argument

The OPTIONS argument sets two main things:

1. Placement and Size of the widget - where the widget appears and how big it is
2. User Controls for the widget - enable the User to set their own size and placement preferences.

## Placement and Size

The placement and size of the widget can be set using the **place** and **size** options.

```html
<!-- In HEAD -->
  <script>

    let $show = {
      title: 'Jeffs Curated Compilation',
      slugs: [
        '/p3/',
        '/p1/',
        '/p5/',
        '/p2/',
      ],
    }

    // large, bottom-left
    function show_big_left()   {
      $kompl.play({
        ...$show,
        place: 'bl',
        size: 'large',
      })
     }

  </script>
```

and then in your HTML you can play the compilation using:

```html
  <!-- in BODY -->
  <button onclick='show_big_left()'>Show me - Big Lefty</button>
```

There are three **size** options:
* **small**
* **medium** - *default*
* **large**

There are six placement options:
* **tl** - top-left
* **tc** - top-center
* **tr** - top-right
* **bl** - bottom-left
* **bc** - bottom-center
* **br** - bottom-right - *default*


Note that you can also control the **margin** surrounding the widget using the `margin:` option. You should specify a number from -24 to +24 - it will always be treated as a `px` value. The default is 4px.
```javascript
$kompl.play({
  /* title, slugs etc */
  margin: 8,  // 8px margin around widget.
})
```

## User Controls

There are four User controls that can be enabled or disabled:
* **placer** - enables User to position the widget on the page by clicking on a border
* **homer** - enables User to return to the ORIGIN by clicking on the Title
* **sizer** - enables User to select **S** - small, **M** - Medium or **L** - Large to size the widget
* **closer** - enables User to close the widget

```javascript
      $kompl.play({
        ...$show,
        homer: true,
        placer: true,
        closer: true,
        sizer: true,
      })
```

## Fully Managed

There are two further options to further manage your user's experience:
* **description** - by default Kompl displays a description - e.g. `1 of 15` - you can remove this by setting the **description** option to false.
* **backward** - by default, Kompl displays a **< Prev** control enabling the user to return to a previous page. You can remove this control by setting the **backward** option to false.

These two options are both set to *false* when you use the **onward** style shortcut.


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

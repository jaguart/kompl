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
        options: {
          place: 'bl',
          size: 'large',
        }
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

## User Controls

There are four User controls that can be enabled or disabled:
* **placer** - enables User to position the widget on the page by clicking on a border
* **homer** - enables User to return to the ORIGIN by clicking on the Title
* **sizer** - enables User to select **S** - small, **M** - Medium or **L** - Large to size the widget
* **closer** - enables User to close the widget

```javascript
      $kompl.play({
        ...$show,
        options: {
          homer: true,
          placer: true,
          closer: true,
          sizer: true,
        }
      })
```

See [Using the STYLE argument](example-style.md) to set **options** to named presets.

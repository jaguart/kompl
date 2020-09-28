# Kompl - the STYLE argument

The STYLE argument is a shorthand that sets several OPTIONS to named presets.

The current STYLE presets are:
  * **rich** - all User controls enabled
  * **choice** - User can choose SIZE and has access to CLOSE
  * **clean** - only the clickable-Title is enabled
  * **naked** - no User controls, just simple navigation.


You can combine STYLE with OPTIONS - entries in OPTIONS will take precedence.

```html
<!-- In HEAD -->
  <script>

    let $show = {
      title: 'Jeffs Curated Pages',
      slugs: [
        '/p3/',
        '/p1/',
        '/p5/',
        '/p7/',
        '/p2/',
      ],
    }

    function show_rich()    { $kompl.play({ ...$show, style: 'rich',    }) }
    function show_choice()  { $kompl.play({ ...$show, style: 'choice',  }) }
    function show_clean()   { $kompl.play({ ...$show, style: 'clean',   }) }
    function show_naked()   { $kompl.play({ ...$show, style: 'naked',   }) }

    // clean - large, bottom-center
    function show_clean_big()   {
      $kompl.play({
        ...$show,
        style:  'clean',
        size:   'large',
        place:  'bc',
      })
     }

  </script>
```

and then in your HTML you can play the compilation using:

```html
  <!-- in BODY -->
  <button onclick='show_compact()'>Show me - Compact</button>
```

---

### Documentation

* [Kompl README](../README.md) - Introduction and installation.
* [Anatomy of Kompl](widget-anatomy.md) - Taxonomy and overview.
* [Kompl Usage Examples](example-usage.md) - Learn by example.
* [Using the STYLE argument](example-style.md) - Named preset options.
* [Using the SHOW argument](example-show.md) - Positioning Kompl on the pages.
* [Using the OPTIONS argument](example-options.md) - Details of all available options.
* [Roadmap - planned features](widget-roadmap.md) - bugs, features, enhancments.

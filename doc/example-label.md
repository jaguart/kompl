# Kompl - the NEXT/PREV label arguments

The NEXT and PREV arguments can be used to change the widget navigation images.

By default, Kompl uses images to navigation back and forth through the list of slugs. Hopefully, these are language agnostic, as they are arrows indicating the direction of navigation.

## Usage

You can change the images to text of your choice. For example, to use **< Prev** and **Next >** you can:
```javascript
$kompl.play({
  /* title, slugs etc */
  prev: '< Prev',
  next: 'Next >',
})
```

or, perhaps, for your French users:
```javascript
$kompl.play({
  /* title, slugs etc */
  prev: 'Precedent',
  next: 'Suivant',
})
```

The two labels can be styled using the `.kompl-prev` and `.kompl-next` CSS selectors.

If you already have your own styling that you would like to use, you can:
```javascript
$kompl.play({
  /* title, slugs etc */
  prev: { label: '< Prev', css: 'my-css-class', }
  next: 'Next >',
})
```
Note that the `css:` specified in the example above will be applied to **both** labels.

If you want different `css:` classes on each label, you can:
```javascript
$kompl.play({
  /* title, slugs etc */
  prev: { label: '< Prev', css: 'my-css-class', }
  next: { label: 'Next >', css: 'my-css-next', }
})
```

If you only specify ONE label - e.g.
```javascript
$kompl.play({
  /* title, slugs etc */
  next: 'Next',
})
```

`$kompl` will automatically add the `Prev` label. The implied labels are always `Prev` or `Next`.

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

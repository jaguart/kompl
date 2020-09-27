# Kompl - Roadmap

Under contruction: *Updated: 27 Sept 2020*

## Features

### `add-show` : Show - at a % or #here
* v0.1
* show: 0.75 - only show the widget when scrolled to at least 75% of the page...
* show: #here - embed the widget in the HTML using `.appendTo('#here)`
* show: 75% - maybe, depending on reliability of numeric parsing in JS

### `add-shortcuts`
* v0.2
* remove need for `options:` subhash in `$kompl.play()` interface

### `add-labels` : Prev: label, Next: label
* v0.3
* replace the SVG icons with the specified text / html
* additional styling if necessary
* can set either or both - YHBW

### `add-spacer` : Enable visible scroll past widget
* vn.n.1

### `add-selectors` : review CSS selectors for external styling
* vn.n.1
* also major review of widget HTML

### `add-builder` : Add PLAY controls into page
* Ghost blogging enhancement?
* embedded markers trigger creation of PLAY buttons/links?

---

## Fixes

Generally in `fix-xxx` branch - but use  `master` if trivial.

* expire Compilation - after 2 days, add an option

## Toolchain

Generally in `master` branch - but use  `fix-xxx` branch if significant.

* `npm version` semver bumping
* gpg signature
* github draft-release integration
* fix code-indent
* get prettier working for TS


---

## Experimental / Development

Generally in `try-xxx` branch - but use  `master` if trivial.

* `try-cssmodules` - see if this is better
* `try-templates` - see if this helps the TESTING HTML, *vue*?
* varions CSS libraries - *tailwind* etc - are they useful?

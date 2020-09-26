# Kompl - Roadmap

Under contruction: *Updated: 26 Sept 2020*

## Features

### `add-show` : Show - at a % or #here
* v0.1
* show: 0.75 - only show the widget when scrolled to at least 75% of the page...
* show: #here - embed the widget in the HTML using `.appendTo('#here)`
* show: 75% - maybe, depending on reliability of numeric parsing in JS

### `add-labels` : Prev: label, Next: label
* v0.2
* replace the SVG icons with the specified text / html
* additional styling if necessary
* can set either or both - YHBW

### `add-selectors` : review CSS selectors for external styling
* v0.3
* also major review of widget HTML

---

## Fixes

Generally in `fix-xxx` branch - but use  `master` if trivial.


## Toolchain

Generally in `master` branch - but use  `fix-xxx` branch if significant.

* `npm version` semver bumping
* gpg signature
* github draft-release integration

---

## Experimental / Development

Generally in `try-xxx` branch - but use  `master` if trivial.

* `try-cssmodules` - see if this is better
* `try-templates` - see if this helps the TESTING HTML, *vue*?
* varions CSS libraries - *tailwind* etc - are they useful?

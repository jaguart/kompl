# Kompl - Widget Anatomy

This document describes the anatomy of the Kompl widget.

## User Interface

The Kompl navigation widget has the following controls that the User can use to set their personal preferences. Controls can be enabled / disabled using the OPTIONS argument in `$kompl.play()` or `$kompl.options()`

* `homer` - makes the TITLE a link that returns to the ORIGIN.
* `placer` - shows clickable border-regions that the User can use to PLACE the widget. There are six places - `tl`, `tc`, `tr`, `bl`, `bc`, `br` - which correspond to top-left, top-center, top-right, bottom-left, bottom-center or bottom-right.
* `sizer` - adds an expanding bar above TITLE containing clickable `S` `M` `L` used to set SIZE to small, medium or large.
* `closer` - adds a CLOSE icon to the expanding bar which cancels play.

*TODO:* add a picture of the UI
<!--
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
-->

## Programmatic Interface

*Note:* Interface elements may be capitalised in this document for emphasis, but -</br>
**All method-names and argument-options are lower-case when being used**

### Private Properties

The Kompl widget has the following *private* attributes -

* `$kompl.#origin` - slug of the page to return to, when the User clicks on TITLE. Optional - defaults to the page that calls PLAY.
* `$kompl.#title` - widget TITLE. User can click on  TITLE to return to  ORIGIN if `homer` is enabled.
* `$kompl.#slugs` - URLs of the pages in the compilation. They must exist - the widget does **not** pre-fetch to validate them.
* `$kompl.#options` - OPTIONS that control widget appearance and behaviour. See [Using the OPTIONS argument](example-options.md).

Private attributes are documented for information only - not settable or gettable, except through the method calls described below.

### Public Methods

The Kompl widget has the following callable interfaces:
* `$kompl.play({...})` - play the compilation. Navigates to first slug and displays the widget.
* `$kompl.options({...})` - set OPTIONS. Set once in `<head>`, to be used by calls to PLAY throughout the page.
* `$kompl.place('bc')` - set placement. Set PLACE once in `<head>` to be used by calls to PLAY throughout the page.
* `$kompl.size('large')` - set SIZE . Set once in `<head>` to be used by calls to PLAY throughout the page.

You can find usage examples here:
* [Kompl Usage](example-usage.md)
* [The STYLE argument](example-style.md)
* [The OPTIONS argument](example-style.md)

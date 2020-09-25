# Kompl - Widget Anatomy

This document describes the anatomy of the Kompl widget.

## User Interface

The Kompl navigation widget has the following controls that the User can interact with, to set their own personal preferences. The controls can be enabled / disabled using the OPTIONS argument in calls to `$kompl.play()` or `$kompl.options()`

* `homer` - this makes the TITLE a clickable link that returns to the ORIGIN.
* `placer` - this creates clickable border-regions that the User can use to PLACE the widget within the viewport. There are six places - `tl`, `tc`, `tr`, `bl`, `bc`, `br` - which correspond to top-left, top-center, top-right, bottom-left, bottom-center or bottom-right.
* `sizer` - this adds an expanding bar above the Title containing clickable `S`, `M` and `L` which can be used to set the SIZE to small, medium or large.
* `closer` - this adds a clickable CLOSE icon to the expanding bar, which enables the User to cancel playing of the compilation.

*TODO:* add a picture of the UI
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

## Programmatic Interface

*Note:* Interface elements may be capitalised in this document for emphasis - **All method-names and argument-options are lower-case when being used**

### Private Properties

The Kompl widget has the following *private* attributes -

* `$kompl.#origin` - slug of the page to return to, when the User clicks on the TITLE. This is an optional `$kompl.play()` argument, that defaults to the page that starts the sequence.
* `$kompl.#title` - TITLE displayed on the widget. A User can click on this TITLE to return to the ORIGIN if the `homer` control is enabled.
* `$kompl.#slugs` - relative URLs of the pages in the compilation, in order. They must exist, and be accurate - the widget does **not** pre-fetch to validate them.
* `$kompl.#options` - OPTIONS that control the appearance and behaviour of the widget. See [Using the OPTIONS argument](example-options.md) for examples.

These private attributes are documented for informational purposes - they are not settable or gettable, except through the method calls described below.

### Public Methods

The Kompl widget has the following callable interfaces:
* `$kompl.play({...})` - play the compilation - the main entry point.
* `$kompl.options({...})` - set OPTIONS for the widget. You can set OPTIONS once in your `<head>`, and they will be used by any calls to PLAY throughout the page.
* `$kompl.place('bc')` - set the placement of the widget. You can set PLACE once in `<head>` and it will be used by any calls to PLAY throughout the page.
* `$kompl.size('large')` - set the SIZE of the widget. You can set this once in `<head>` and it will be used by any calls to PLAY throughout the page.

You can find usage examples here:
* [Kompl Usage](example-usage.md)
* [The STYLE argument](example-style.md)
* [The OPTIONS argument](example-style.md)

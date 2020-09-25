# Kompl - Widget Anatomy

This document describes the anatomy of the Kompl widget.

__*Note:*__ Interface elements may be capitalised for emphasis - **All method-names and argument-options are lower-case when being used**

## Programmatic Interface

### Private Properties

The Kompl widget has the following *private* attributes -

* `$kompl.#origin` - Slug of the page to return to, when the User clicks on the Title. This is an optional `$kompl.play()` argument, that defaults to the page that starts the sequence.
* `$kompl.#title` - Title displayed on the widget. User can click on this Title to return to the ORIGIN if the `homer` User control is enabled.
* `$kompl.#slugs` - relative URLs of the pages in the compilation, in order. They have to exist, and have to be accurate - the widget does **not** pre-fetch to validate them.
* `$kompl.#options` - options that control the appearance and behaviour of the widget. See [Using the OPTIONS argument](example-options.md) for the details.

These private attributes are documented for clarification - they are not settable or gettable, except through the method calls described below.

### Public Methods

The Kompl widget has the following callable interfaces:
* `$kompl.play({...})` - play the compilation - the main entry point.
* `$kompl.options({...})` - set options for the widget. You can set OPTIONS once in your `<head>`, and they will be used by any calls to `$kompl.play()` throughout the page.
* `$kompl.place('bc')` - set the placement of the widget. You can set PLACE once in `<head>` and it will be used by any calls to `$kompl.play({...})` throughout the page.
* `$kompl.size('large')` - set the size of the widget. You can set this once in `<head>` and it will be used by any calls to `$kompl.play({...})` throughout the page.

### Examples

*TBC...*

## User Interface

The Kompl navigation widget has the following controls that the User can interact with, to set their own personal preferences. The controls can be enabled / disabled using the OPTIONS argument i calls to `$kompl.play()` or `$kompl.options()`

* `homer` - this makes the Title a clickable link that returns the User to the ORIGIN.
* `placer` - this creates clickable border-regions that the User can use to place the widget at different parts of the viewport - there are six valid places - `tl`, `tc`, `tr`, `bl`, `bc`, `br` - which correspond to top-left, top-center, top-right, bottom-left, bottom-center or bottom-right.
* `sizer` - this adds an expanding bar above the Title containing clickable `S`, `M` and `L` which can be used to set the size to small, medium or large.
* `closer` - this adds a clickable CLOSE icon to the expanding bar, which enables the User to cancel playing of the compilation.

### Examples

*TBC...*

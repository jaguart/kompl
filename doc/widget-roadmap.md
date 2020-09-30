# Kompl - Roadmap

Continually under contruction: *Updated: 28 Sept 2020*

## Fixes

Generally in `fix-xxx` branch - but use  `master` if trivial.

**Open items**
* *TBC...*

---

## Features

### `add-easycss` : review CSS selectors for external styling
* vn.n.1
* also major review of widget HTML

### `add-labels` : Prev: label, Next: label
* v0.n
* replace the SVG icons with the specified text / html
* additional styling if necessary
* can set either or both - YHBW

### `add-builder` : Add PLAY controls into page
* Ghost blogging enhancement?
* embedded markers => create styled PLAY buttons/links?

---

## Toolchain

Generally in `master` branch - but use  `fix-xxx` branch if significant.

* auto-zip
* gpg signature
* github draft-release integration
* auto-deploy to websites on release?
* get prettier working for TS
* switch from `npm run` to `gulp` for more flexibility

---

## Experimental / Development

Generally in `try-xxx` branch - but use  `master` if trivial.

* `try-cssmodules` - see if this is better
* `try-templates` - see if this helps the TESTING HTML, *vue*?
* `try-cssxxx` - varions CSS libraries - *tailwind* etc - are they useful?

---

### Documentation

* [Kompl README](../README.md) - Overview and installation.
* [Anatomy of Kompl](widget-anatomy.md) - Taxonomy and overview.
* [Kompl Usage Examples](example-usage.md) - Learn by example.
* [Using the STYLE argument](example-style.md) - Named preset options.
* [Using the SHOW argument](example-show.md) - Positioning Kompl on the pages.
* [Using the OPTIONS argument](example-options.md) - Details of all available options.
* [Roadmap - planned features](widget-roadmap.md) - bugs, features, enhancments.

---

## Remember Me

**Fix Branch**
```
git checkout master
git pull --all
git checkout -b fix-thingy
git commit ...
```

**Release Fix**
```
git checkout master
git pull --all
git merge fix-thingy
npm version n.n.n
npm run clean
npm run build
# final test / confirmation
git checkout -n rel-n.n.n
git checkout master
git push --all
```

* create release and release tag on Githum
* delete fix-thingy on github
* `git pull --all` - pull deletes locally
* `git tag` - to list tags
* `git branch` - to list branches

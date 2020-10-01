/* eslint-disable no-var */
// main.ts

import Kompilation from "./kompl";

declare global {
  var $kompl: Kompilation
}

//var $kompl = new Kompilation()
//window.$kompl = $kompl
window.$kompl = new Kompilation()

// DOMContentLoaded
// @see https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

// eslint-disable-next-line @typescript-eslint/no-unused-vars
document.addEventListener('DOMContentLoaded', function (ev) {
  window.$kompl.initialise();
})

/* ----------------------------------------------------------------------------
 * gulpfile.ts
 *
 * Trying to keep this minimal - the main build process etc. being managed
 * in 
 * ---------------------------------------------------------------------------*/

// ----------------------------------------------------------------------------
// TODO: things to follow up on...
// ----------------------------------------------------------------------------
//
// Some good LINT tips here, incl integration with git
// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
//
// ----------------------------------------------------------------------------

//------------------------------------------------------------------------------
// INITIALISE
//------------------------------------------------------------------------------

// TS goodness for gulp callback arg
// Easier to use than the gulp.TaskFunction definition!
interface Callback { ( e? : Error ): void; }

// Gulp and generic helpers
import { parallel, series, src, dest, watch as watchify } from 'gulp'
import { default as chmod         } from 'gulp-chmod'

// Configuration
import { default as $project } from './package.json'

const $path = {
  main:   $project.main,
  dist:   "dist/",
  ts:     [ "src/*.ts"],
  html:   [ "src/*.html"],
  css:    [ "src/*.css"],
  asset:  [ "src/*.svg", "src/*.jpg", "src/*.png", "src/*.ico" ],
}

//------------------------------------------------------------------------------
// BUILD html - minify
// Here because gulp handles src/*.html -> dist/*.html nicely 
// npm i -D gulp-htmlmin
// manually create types/gulp-htmlmin/index.d.ts
//------------------------------------------------------------------------------

import { default as htmlmin         } from 'gulp-htmlmin'
import { default as $htmlmin_config } from './html-minifier.config.json'

export function build_html ( _cb : Callback ) {
  return src( $path.html )
    .pipe( htmlmin($htmlmin_config) )
    .pipe(chmod(0o644))
    .pipe(dest( $path.dist ));
}

// generic copy helper
function copy_dist ( cb: Callback, glob: string | string[] ) {
  return src( glob )
    .pipe(chmod(0o644))
    .pipe(dest( $path.dist ))
}


export function build_assets ( cb : Callback ) {
  return copy_dist( cb, $path.asset )
}


/*
//------------------------------------------------------------------------------
// BUILD
//------------------------------------------------------------------------------
import { execSync } from 'child_process'
export function build_ts ( cb: Callback ) : void {
    execSync('npm run build')
    cb()
  }
*/

//------------------------------------------------------------------------------
// SHIP
//------------------------------------------------------------------------------

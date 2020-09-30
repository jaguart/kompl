import { default as Handlebars } from "handlebars"
import { default as glob } from "glob"
import { default as fs } from "fs"
import { basename } from "./jaguart-util-css"

interface JennyPaths {
  out:      string,
  views:    string,
  partials: string,
  layouts:  string,
}

class Jenny {

  paths: JennyPaths = {
    out:      "dist/",
    views:    "src/views/*.hbs",
    partials: "src/views/partials/*.hbs",
    layouts:  "src/views/layouts/*.hbs",
  }

  public generate ( PATHS: JennyPaths ) {
    // generate an html for each view, using partials and layouts
    this.paths = { ...this.paths, ...PATHS }
    if ( this.paths.out.substr(-1) != '/' ) this.paths.out += '/'

    this.registerHelpers()

    const $layouts = glob.sync( this.paths.layouts  )
    $layouts.forEach(( $input ) => {
      this.registerLayout( $input )
    })

    const $partials = glob.sync( this.paths.partials  )
    $partials.forEach(( $input ) => {
      this.registerPartial( $input )
    })

    const $views = glob.sync( this.paths.views  )
    $views.forEach(( $input ) => {
      this.generateOutHTML( $input )
    })

  }

  private registerHelpers () {

    // Get DATA into HELPER by putting it between the helper-block tags.
    Handlebars.registerHelper('list-ul', function( options ) {
      const $rows = options.fn().split("\n")
      const $lis = $rows.map(
          ( $row : string ) =>
          $row ? `<li>${$row}</li>` : ''
        )
      // eslint-disable-next-line no-console
      // console.log( options )
      const $title = options.hash.title ? `<h2>${options.hash.title}</h2>\n` : ``
      return `${$title}<ul>\n ${ $lis.join("\n") }\n</ul>\n`
    })


    // -------------------------------------------------------------------------
    Handlebars.registerHelper('table-piped', function( options ) {

      let $rows_td : Array<Array<string>> =
        Jenny.getLines( options.fn() )
        .map( ($row : string ) =>  $row.split(/\s*\|\s*/)  )

      // remove leading-empty-td, trailing-empty-td and completely-empty-tr
      $rows_td.forEach(( $row : Array<string> ) => {
        if ( $row.length > 0 && String($row.slice(-1)).length == 0 ) $row.pop()
        if ( $row.length > 0 && String($row[0]).length == 0 ) $row.shift()
      });
      $rows_td = $rows_td.filter(( $row : Array<string> ) => $row.length > 0 )

      // pull out any th - header rows
      const $th_rows = parseInt(options.hash.th_rows)
      let $rows_th : Array<Array<string>> = []
      if ( $th_rows > 0 ) {
        $rows_th = $rows_td.slice( 0, $th_rows )
        $rows_td = $rows_td.slice( $th_rows )
      }

      // prepare HTML
      const $caption = options.hash.caption ? `<caption>${options.hash.caption.trim()}</caption>` : ''

      const $th_html : string = $th_rows > 0
        ? "<thead>\n" +
          $rows_th.map(( $row : Array<string> ) => `<tr>\n  <th>${ $row.join("</th>\n  <th>")}</th>\n</tr>`).join("\n") +
          "\n</thead>"
        : ''

      let $td_html : string = $rows_td.map(( $row : Array<string> ) => `<tr>\n  <td>${ $row.join("</td>\n  <td>")}</td>\n</tr>`).join("\n")

      if ( $rows_th.length > 0 && $rows_td.length > 0 ) {
        $td_html = `<tbody>\n${$td_html}\n</tbody>`
      }

      return `<table>\n${$caption}\n${$th_html}\n${$td_html}\n</table>\n\n`

    })

    // -------------------------------------------------------------------------
    // TODO: add type= disabled name value
    Handlebars.registerHelper('button', function( options ) {
      const $button = options.fn().split( /\s*=>\s*/ )
      //console.log( $button )
      return `<button onclick="${ $button[1].trim() }">${ $button[0].trim() }</button> `
    })


  }

  private registerLayout ( $input : string ) {

    //Jenny.say('generateLayout: ' + $input )
    const template = Handlebars.compile( fs.readFileSync( $input, 'utf8' ) )
    Handlebars.registerPartial( 'layout-' + basename( $input ), template )

  }

  private registerPartial ( $input : string ) {

    //Jenny.say('generatePartial: ' + $input )
    const template = Handlebars.compile( fs.readFileSync( $input, 'utf8' ) )
    Handlebars.registerPartial( 'partial-' + basename( $input ), template )

  }

  private generateOutHTML ( $input : string ) : void {

    const template = Handlebars.compile( fs.readFileSync( $input, 'utf8' ) )
    const $outfile = this.paths.out + basename( $input ) + '.html'

    fs.writeFile( $outfile, template({}), (er) => {
      if ( er ) {
        Jenny.say(er)
      }
      else {
        fs.stat( $outfile, (er, stats ) => {
          if ( er ) {
            Jenny.say(er)
          }
          else {
            Jenny.say(`created: ${$outfile} ${stats.size} bytes`)
          }
        })
      }
    })
  }

  // need to get conditional code inclusion working...
  private static say( message: string | Record<string, unknown> | Error , trace = false ) {
    // eslint-disable-next-line no-console
    console.log(
      typeof message === 'string' ? `HTML-Jenny: ${message}` : message,
      (trace ? ' at ' + Error('stack-trace').stack : '')
      )
  }

  private static getLines ( $str : string ) : string[] {
    const $rows = $str.split(/\s*\n/ )

    const $logical : string[] = []
    let $index = 0

    $rows.forEach( ( $row : string ) => {
      $row.trim()
      if ( $row.length > 0 ) {
        if ( $row.slice(-1) == '\\' ) {
          $logical[$index] = $logical[$index] ? $logical[$index] + ' ' + $row.slice( 0, -1 ).trim() : $row.slice( 0, -1 ).trim()
        }
        else {
          $logical[$index] = $logical[$index] ? $logical[$index] + ' ' + $row.trim() : $row.trim()
          $index++
        }
      }
    })

    return $logical

  }

}

const PATHS : JennyPaths = {
  out:      "dist/",
  views:    "src/views/*.hbs",
  partials: "src/views/partials/*.hbs",
  layouts:  "src/views/layouts/*.hbs",
}

const $jen = new Jenny()
$jen.generate( PATHS )

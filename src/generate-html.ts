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

    // not sure how you get data into this helper in a template...
    Handlebars.registerHelper('list-ul', function( items, options ) {
      const $lis = items.map(
          ( item : Record<string,unknown> ) =>
          `<li>${options.fn(item)}</li>`
        )
      return `<ul>\n ${ $lis.join("\n") }\n</ul>\n`
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

}

const PATHS : JennyPaths = {
  out:      "dist/",
  views:    "src/views/*.hbs",
  partials: "src/views/partials/*.hbs",
  layouts:  "src/views/layouts/*.hbs",
}

const $jen = new Jenny()
$jen.generate( PATHS )

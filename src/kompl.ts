/* -----------------------------------------------------------------------------
    Kompilation - A Compilation Navigation Widget.
    Created by Jeff, jaguart on Guthub, jeff@jamatic.com.
    -----------------------------------------------------------------------------
    INSTALLATION:
        1. Download the release zip - kompl.zip
        2. Extract the contents into a folder accessible from your web-pages.
                unzip kompl.zip www.mysite.com/assets/

        3. Check the permissions of the extracted files.
                ls -lr www.mysite.com/assets/

    USAGE:
         1. Make sure you have indluded JQuery in your web-page.
         2. Include kompl.bundle.js below JQuery in all your web-pages:
              <script src="/assets/kompl.bundle.js"></script>
         3. In an onClick() make this call:
              onclick="$kompl.play({ title:'Title', slugs:['/p1/', '/p2/, '/p3/' ]})"
   ----------------------------------------------------------------------------- */

// -----------------------------------------------------------------------------
// These are here for webpack...
// Webpack - auto-adds inline CSS in <HEAD>
// import '../css/kompl.css';
// Webpack - add files to DIST, hashed-name for URL in import-name.
//import KomplImageUpURL     from '../image/kompl-up.svg';
//import KomplImagePlusURL   from '../image/kompl-plus.svg';
// -----------------------------------------------------------------------------

// import './kompl.module.css';

// weirdly, the VS Code lib.dom.d.ts has this, but the node_modules in
// my dev folder doesn't
declare global {
  interface Window {
    scrollTop: number
  }
  interface Document {
    scrollTop: number
  }
}

//import { dirname, CSS } from './jaguart-util-css.js'
import { dirname, CSS } from './jaguart-util-css'

// -----------------------------------------------------------------------------
// Interfaces for public methods
interface KomplOptions {
    place?    : string          // widget placement - tl | tc | tr | bl | bc | br
    size?     : string          // widget size - small | medium | large
    show?     : string|number   // show - number: at-scroll, string: in this element
    homer?    : boolean         // origin link on title
    closer?   : boolean         // show closer on bar
    placer?   : boolean         // placement-click regions
    sizer?    : boolean         // show sizer on bar
}

interface KomplStyle {
    rich    : KomplOptions
    choice  : KomplOptions
    clean   : KomplOptions
    naked   : KomplOptions
}

interface KomplDefinition {
    title     : string          //  TITLE for the Kompilation, anchors to HOME
    slugs     : string[]        //  SLUGS to navigate through, in order.
    origin?   : string          //  HOME URL of the Kompilation
    style     : string          //  Name of an option style: clear | rich etc.
    options?  : KomplOptions    //  OPTIONS that tweak presentation and behaviour
}


// -----------------------------------------------------------------------------
export class Kompilation {

    // Statics seem to minify better - the name is NOT mangled by terser/terser

    static readonly KomplAssetCSS           = 'kompl.bundle.css' // kompl.css
    static readonly KomplAssetSVGUp         = 'kompl-up.svg'
    static readonly KomplAssetSVGPlus       = 'kompl-plus.svg'

    // Valid position css-classes for Widget - top-left to bottom-right.
    static readonly WidgetPlaceEnum         = ['tl','tc','tr','bl','bc','br',]
                                                .map( x => 'kompl-at-' + x)

    // Valid size css-classes for Widget
    static readonly WidgetSizeEnum          = ['small','medium','large',]
                                                .map( x => 'kompl-sz-' + x)

    // localStorage keys
    static readonly KomplStorageData        = 'kompl-data'
    static readonly KomplStorageOptions     = 'kompl-options'
    static readonly KomplStoragePlace       = 'kompl-place'
    static readonly KomplStorageSize        = 'kompl-size'

    // Kompilation.DEFAULT_OPTIONS
    static readonly DEFAULTS : KomplOptions = {
        place:    'br',
        size:     'medium',
        homer:    true,
        closer:   true,
        placer:   true,
        sizer:    true,
        }

    static readonly STYLE : KomplStyle = {
        rich    : { homer: true,  closer: true,  sizer: true,  placer: true  },
        choice  : { homer: true,  closer: true,  sizer: true,  placer: false },
        clean   : { homer: true,  closer: false, sizer: false, placer: false },
        naked   : { homer: false, closer: false, sizer: false, placer: false },
    }

    // Kompilation.URL_BASE
    // prepended to file-assets to create resolvable URL.
    // /.well-known/ is a folder used by LetsEncrypt in Ghost
    static URL_BASE = '/.well-known/'

    // -------------------------------------------------------------------------
    // Kompilation instance properties - all hard-privates
    #origin = ''
    #title  = ''
    #slugs: string[] = []

    // Would like to have used DEFAULT_OPTIONS but dont yet know how to make that happen
    #options = { ... Kompilation.DEFAULTS }

    // Instance State variables
    #_index:   number | undefined = undefined     // zero-based index for window.location.pathname in #slugs
    #_widget:  JQuery | undefined = undefined     // Kompl collection navigation widget
    #_spacer:  JQuery | undefined = undefined     // Kompl spacer - ensure body can scroll clear of #widget_nav
    #_show_when = 0                               // show when scrolled more than this. 0.0 - 1.0
    #_show_at = 0                                 // show when window.scrollTop() is > this px

    // -----------------------------------------------------------------------

    // called in bundle main.js to instantiate global - not usually from page
    public constructor() {
        // Kompilation.say('constructed')
        return this
    }

    /* -----------------------------------------------------------------------
     * The main EVERY-PAGE ENTRYPOINT called in document-event-DOMContentLoaded
     * If Kompilation is in-play, #widget_nav will be displayed.
     * There is deliberately NO createKompilation here because I feel that
     * this would confuse consumers.
     * ----------------------------------------------------------------------- */
    public initialise() : void {

        // Kompilation.say('initialising...')

        this._restoreCompilation()

        // Cannot SHOW until document DOMContentLoaded event has fired
        // Would be cool to move just this call to
        // document.addEventListener('DOMContentLoaded', (ev)=> {})
        this._setURLBase()
        this._addCSSToHead()
        this._showNavigation()

        // TBC
        // parse doc for all Kompilation definitions, adding a PLAY element?

        // Kompilation.say(`initialised at ${Kompilation.URL_BASE}` )

    }

    /* -----------------------------------------------------------------------
     * This is the MAIN ENTRYPOINT called by end user to show the Kompilation
     * It returns a BOOLEAN - true on success, false on no-compilation so that
     * callers can respond in onclick. Call this on a User initiated event.
     * ----------------------------------------------------------------------- */
    public play( arg: KomplDefinition ) :boolean {

      // Kompilation.say('playing...')
      if ( arg.style ) {
        if ( Kompilation.STYLE[arg.style as keyof KomplStyle] ) {
            arg.options = { ...Kompilation.STYLE[arg.style as keyof KomplStyle], ...arg.options }
        }
        else {
            Kompilation.warn( `unknown style: ${arg.style} - ignored`)
        }
      }

      if ( arg.options ) {
        // If options are specified, make them a complete set
        arg.options = { ...Kompilation.DEFAULTS, ...arg.options }
      }
      if ( arg ) this._createCompilation( arg )

      if ( this.#slugs.length > 0 ) {
          this._persistCompilation()
          // Kompilation.say('In-play.')
          window.location.pathname = this.#slugs[0]
          return true
      }
      // Kompilation.say('Nothing to play')
      return false
    }


    private _createCompilation( arg: KomplDefinition ) : void {

        // Kompilation.say('creating...')
        //for (const [key, value] of Object.entries(arg)) {
        //    Kompilation.say(`arg: ${key}: ${typeof(value)} = ${value}`);
        //}

        this.#origin    =   typeof( arg.origin ) == 'string' ? arg.origin : window.location.pathname
        this.#title     =   typeof( arg.title ) == 'string' ? arg.title : ''
        this.#slugs     =   Array.isArray( arg.slugs )
                            ? [ ...arg.slugs]
                            : (typeof(arg.slugs) == 'object'
                            ? Object.values(arg.slugs)
                            : [])

        // this call has NO side-effects - just sets options for later evaluation
        this._setOptions( arg.options )

        // Kompilation.say( 'created: ' + this._title  + ' origin: ' + this._origin + ' slugs: ' + this._slugs.length )
    }

    /* -----------------------------------------------------------------------
     * Publicly callable - options  for this Compilation, will trigger a
     * widget refresh if necessary
     * ----------------------------------------------------------------------- */
    public options ( arg: KomplOptions | string ) : void {
      if ( typeof arg === 'string' ) {
        if ( Kompilation.STYLE[arg as keyof KomplStyle] ) {
          arg = { ...Kompilation.STYLE[arg as keyof KomplStyle] }
        }
        else {
          Kompilation.warn( `unknown style: ${arg} - ignored`)
          return
        }
      }
      this._setOptions( arg )
      this._persistOptions()
      this._refreshNavigation()
    }

    /* -----------------------------------------------------------------------
     * Set #position zero-based index into #slugs.
     * return TRUE if we are on a page that is in-play [!??]
     * A little bit expensive?
     * ----------------------------------------------------------------------- */
    private _setNavIndex() : boolean {
        this.#_index = undefined;
        const $here = window.location.pathname
        this.#slugs.some(( $slug, $i ) => {
            if ( $slug == $here ) {
                this.#_index = $i
                return true
            }
        })
        // Kompilation.say('index is: ' + this._nav_index + ' at ' + $here)
        return typeof this.#_index == 'number'
    }

    /* -----------------------------------------------------------------------
     * Construct Nav widget HTML
     * ----------------------------------------------------------------------- */
    private _getNavInnerHTML () : string  {

        if ( typeof this.#_index === 'number' ) {

            // TODO: migrate from style to css
            let $prev_href  = ''
            let $prev_style ='style="filter: opacity(30%);transform: rotate(-90deg);"'
            if ( this.#_index > 0 ) {
                $prev_href  = `href="${ this.#slugs[this.#_index-1] }"`
                $prev_style = 'style="transform: rotate(-90deg);"'
            }

            let $prev = ''
            $prev  = `<a ${ $prev_href }><img src="${ Kompilation.URL_BASE + Kompilation.KomplAssetSVGUp }" ${$prev_style} ></a>`

            let $next_href  = ''
            let $next_style ='style="filter: opacity(30%);transform: rotate(90deg);"'
            if ( this.#_index < this.#slugs.length-1 ) {
                $next_href  =`href="${ this.#slugs[this.#_index+1] }"`
                $next_style = 'style="transform: rotate(90deg);"'
            }
            let $next = ''
            $next  = `<a ${ $next_href }><img src="${ Kompilation.URL_BASE + Kompilation.KomplAssetSVGUp }" ${$next_style} ></a>`

            let $last_html = ''
            $last_html  = `<a href="${ this.#slugs[this.#slugs.length-1] }">${ this.#slugs.length.toString() }</a>`

            let $descr = ''
            $descr = `<div class="kompl-descr"><b>${this.#_index+1}</b> of ${$last_html}</div>`

            const $sizer = this.#options.sizer ?
            `
            <div class="kompl-sizer-small"  onclick="$kompl.size('small')">S</div>
            <div class="kompl-sizer-medium" onclick="$kompl.size('medium')">M</div>
            <div class="kompl-sizer-large"  onclick="$kompl.size('large')">L</div>
            `
            :
            `<div class="kompl-sizer-small"></div>`

            const $closer = this.#options.closer
            ? `<img class="kompl-closer" onclick="$kompl.clear()" src="${ Kompilation.URL_BASE + Kompilation.KomplAssetSVGPlus }"/>`
            : ``

            const $bar = this.#options.sizer || this.#options.closer
            ? `<div class="kompl-bar kompl-hide" onclick="$kompl.toggleBar()"> ${ $sizer } ${ $closer } </div>`
            : ``

            const $placer = this.#options.placer
            ? `
            <div class="kompl-place-tl kompl-at-tl" onclick="$kompl.place('tl')"></div>
            <div class="kompl-place-tc kompl-at-tc" onclick="$kompl.place('tc')"></div>
            <div class="kompl-place-tr kompl-at-tr" onclick="$kompl.place('tr')"></div>
            <div class="kompl-place-br kompl-at-br" onclick="$kompl.place('br')"></div>
            <div class="kompl-place-bc kompl-at-bc" onclick="$kompl.place('bc')"></div>
            <div class="kompl-place-bl kompl-at-bl" onclick="$kompl.place('bl')"></div>
            `
            : ``

            const $title = this.#options.homer
            ? `
            <div class="kompl-title"><a href="${ this.#origin }">${ this.#title }</a></div>
            `
            : `
            <div class="kompl-title">${ this.#title }</div>
            `

            return `
            <div class="kompl-inner">
              ${ $placer }
              ${ $bar }
              ${ $title }
              <div class="kompl-nav">${ $prev } ${ $descr } ${ $next }</div>
            </div>
            `
        }
        return ''
    }

    private _addCSSToHead() {
      // webpack inlines the CSS in head... but we have switched to rollup
      $('head').append(`<link rel='stylesheet' href='${ Kompilation.URL_BASE + Kompilation.KomplAssetCSS }' type='text/css' media='screen'>`);
    }

    /* -----------------------------------------------------------------------
     * Display the #widget_nav and spacer if we are in-play.
     * Any previously displayed element is removed.
     * ----------------------------------------------------------------------- */
    private _showNavigation() : void {

        this._setNavIndex();
        if ( typeof this.#_index === 'number' ) {
            Kompilation.say('showing...')
            const $size_css   = Kompilation.__getSizeCSSClass( this.#options.size )
            const $place_css  = Kompilation.__getPlaceCSSClass( this.#options.place )

            this.#_widget = $('<div>',{
                id:     'kompl',
                class:  `kompl-compilation kompl-hide ${ $place_css } ${ $size_css }`,
              })
            this.#_widget.html( this._getNavInnerHTML() )

            let $container = 'body'

            Kompilation.say(`show: ${ this.#options.show }`)
            Kompilation.say(`show: huh???!`)

            if ( this.#options.show ) {
              if ( typeof this.#options.show === 'number' ) {

                Kompilation.say(`show: number ${ this.#options.show }`)

                if ( this.#options.show > 1 && this.#options.show <= 100 )  {
                  this.#_show_when = this.#options.show / 100
                }
                else if ( this.#options.show >= 0.01 && this.#options.show <= 1.00 ) {
                  this.#_show_when = this.#options.show
                }
                else {
                  Kompilation.warn(`invalid show: ${ this.#options.show } - ignored - must be 1-100 or 0.01-1.00`)
                }

                Kompilation.say(`show when: ${ this.#_show_when }`)

              }
              else if ( typeof this.#options.show === 'string' ) {

                Kompilation.say(`show: string ${ this.#options.show }`)

                if ( this.#options.show.substring(0,1) === '#' ) {
                  const $id = this.#options.show.substring(1)
                  if ( document.getElementById($id) ) {
                    $container = this.#options.show // includes the #
                    Kompilation.say(`show: in element ${ this.#options.show }`)
                    this.#_widget.css("position", "relative")

                  }
                  else {
                    Kompilation.warn(`invalid show: ${ this.#options.show } - no such element - ignored`)
                  }
                }
                else {
                  Kompilation.warn(`invalid show: ${ this.#options.show } - must start with # - ignored`)
                }
              }
              else {
                Kompilation.warn(`invalid show: ${ this.#options.show } - must be number or string - ignored`)
              }

            }
            else {
              Kompilation.say("options.show is not set")
            }

            Kompilation.say(`show: container ${ $container }`)

            // set up event-listeners to display widget when desired position is reached
            if ( this.#_show_when > 0 ) {

              Kompilation.say(`will show: when ${ this.#_show_when }`)

              /*
              const $vis_px     = document.documentElement.clientHeight // height of visible content
              const $doc_px     = Math.max( $vis_px, document.documentElement.scrollHeight ) // height of visible content
              const $doc_scroll = Math.max( 0, $doc_px - $vis_px )
              this.#_show_at    = Math.round( $doc_scroll * this.#_show_when )
              */

              if ( $(window) ) {
                if ( $(document)  ) {
                  const $vis_px     = $(window).height()    || 0
                  const $doc_px     = $(document).height()  || 0 // height of visible content
                  const $doc_scroll = Math.max( 0, $doc_px - $vis_px )
                  this.#_show_at    = Math.round( $doc_scroll * this.#_show_when )

                  Kompilation.say(`have vis   : ${ $vis_px } px`)
                  Kompilation.say(`have doc   : ${ $doc_px } px`)
                  Kompilation.say(`can scroll : ${ $doc_scroll } px`)
                  Kompilation.say(`show at    : ${ this.#_show_at } px`)
                }
              }

              this._addWindowsEventHandlers()
              if ( this.#_show_at > 0 ) {
                this.#_widget.css('visibility','hidden')
              }

            }
            else {
              Kompilation.say(`show when skipped: ${ this.#_show_when }`)
            }

            this.#_widget.appendTo($($container))
            this.#_widget.removeClass('kompl-hide')

            Kompilation.say('displayed.')
        }
        else if ( this.#_widget ) {
          // Kompilation.say('remove widget - not in-play')
          this.#_widget.remove();
          this.#_widget = undefined;
        }

      }

    private _refreshNavigation() : void {
        if ( this.#_widget ) {
          this.#_widget.html( this._getNavInnerHTML() );
        }
      }

    // --------------------------------------------------------------------------
    // persist and restore - mirrored-behaviour please.
    private _persistCompilation () {
      // Kompilation.say('persisting...')
      this._persistData()
      this._persistOptions()
    }

    private _persistData() {
      window.localStorage.setItem(
        Kompilation.KomplStorageData,
        JSON.stringify({
          origin:   this.#origin,
          title:    this.#title,
          slugs:    this.#slugs,
        })
      )
  }
    private _persistOptions() {
      window.localStorage.setItem(
        Kompilation.KomplStorageOptions,
        JSON.stringify( this.#options )
      )
    }

    private _restoreCompilation () : void {
      // Kompilation.say('restoring...')
      const $data     = window.localStorage.getItem( Kompilation.KomplStorageData )     // managed by ->play()
      const $options  = window.localStorage.getItem( Kompilation.KomplStorageOptions )  // managed by ->play()
      const $place    = window.localStorage.getItem( Kompilation.KomplStoragePlace )    // set by user
      const $size     = window.localStorage.getItem( Kompilation.KomplStorageSize )     // set by user
      if ( $data ) {
        this._createCompilation( JSON.parse( $data ) )
        if ( $options ) {
          this._setOptions( JSON.parse( $options ) )
        }
      }
      // if $data?? TODO: validation?
      if ( $place ) this.#options.place = $place
      if ( $size )  this.#options.size  = $size
    }

    // --------------------------------------------------------------------------
    // remove the Collection, including localStorage
    // callable from page - by Closer
    public clear () : void {
      // Kompilation.say('Clearing...')

      // destroy all widgets
      if ( this.#_widget ) this.#_widget.remove()
      if ( this.#_spacer ) this.#_spacer.remove()

      // We only clear Compilation - not  users preferred place and size.
      window.localStorage.removeItem( Kompilation.KomplStorageData )
      window.localStorage.removeItem( Kompilation.KomplStorageOptions )

      this.#origin    = ''
      this.#title     = ''
      this.#slugs     = []
      this.#options   = { ... Kompilation.DEFAULTS }
      this.#_index = undefined
      this.#_widget = undefined

  }

  public reset () : void {
    // Kompilation.say('Resetting...')
    this.clear()
    window.localStorage.removeItem( Kompilation.KomplStorageSize )
    window.localStorage.removeItem( Kompilation.KomplStoragePlace )
  }

  // --------------------------------------------------------------------------
  // set options with NO SIDE EFFECTS
  //  - do NOT refresh widget
  //  - do NOT persist options
  private _setOptions ( arg : KomplOptions | undefined ) : void {

    if ( arg ) {
      // Kompilation.say('opting...')
      // for (const [$key, $value] of Object.entries(arg)) {
      //    Kompilation.say(`arg: ${$key}: ${typeof($value)} = ${$value}`)
      // }
      Object.assign( this.#options, arg )
      //console.log( arg )
      //console.log( this._options )
    }

    // // Kompilation.say(`opt: place:  ${ this._options.place }`)
    // // Kompilation.say(`opt: size:   ${ this._options.size }`)
    // // Kompilation.say(`opt: homer:  ${ this._options.homer }`)
    // // Kompilation.say(`opt: closer: ${ this._options.closer }`)
    // // Kompilation.say(`opt: placer: ${ this._options.placer }`)
    // // Kompilation.say(`opt: sizer:  ${ this._options.sizer }`)

  }

  private static __getPlaceCSSClass ( $which : string | undefined ) : string {
    if ( $which ) {
      const $css = 'kompl-at-' + $which
      if ( Kompilation.WidgetPlaceEnum.indexOf( $css ) > -1 ) {
        return $css
      }
      // Kompilation.say(`oops: invalid place - ${$which} - ignored`)
    }
    return 'kompl-at-br'
  }

  // Note that USER preferences take precedece over play-options
  // even though initial play options determine whether the user
  // gets a chance to call ->place() or ->size()
  public place( $place: string | null | undefined  ) : void {
    if ( $place ) {
      const $css_class = Kompilation.__getPlaceCSSClass( $place )
      // Kompilation.say('place: ' + $css_class )
      if (
        CSS.toggleClass({
          widget : this.#_widget,
          enum   : Kompilation.WidgetPlaceEnum,
          set    : $css_class,
        })
      ){
        window.localStorage.setItem( Kompilation.KomplStoragePlace, $place )
      }
    }
  }

  private static __getSizeCSSClass ( $which : string | undefined ) : string {
    if ( $which ) {
      const $css = 'kompl-sz-' + $which
      if ( Kompilation.WidgetSizeEnum.indexOf( $css ) > -1 ) {
        return $css
      }
      // Kompilation.say(`oops: invalid size - ${$which} - ignored`)
    }
    return 'kompl-sz-medium'
  }

  public size( $size: string | null | undefined ) : void {
    if ( $size ) {
      const $css_class = Kompilation.__getSizeCSSClass( $size )
      // Kompilation.say('size: ' + $css_class )
      if (
        CSS.toggleClass({
            widget : this.#_widget,
            enum   : Kompilation.WidgetSizeEnum,
            set    : $css_class,
        })
      ){
        window.localStorage.setItem( Kompilation.KomplStorageSize, $size )
      }
    }
  }

  // Kompilation.URL_BASE is used to determine URL for SVG and CSS
  private _setURLBase () : void {
    const $origin = $('script[src*="kompl."]').attr("src")
    if ( $origin ) {
      const $url = new URL( $origin, window.location.href )
      Kompilation.URL_BASE = dirname( $url.pathname )
    }
    else {
      // Kompilation.say( 'Kompilation: unable to determine script-src-origin' + $origin )
    }
  }

  // TODO: These are for testing...
    public showCloser() : void {
        $('.kompl-closer').removeClass( 'kompl-hide');
    }

    public hideCloser() : void {
        $('.kompl-closer').addClass( 'kompl-hide');
    }

    public showBar() : void {
        $('.kompl-bar').removeClass( 'kompl-hide');
    }

    public hideBar() : void {
        $('.kompl-bar').addClass( 'kompl-hide');
    }

  public toggleBar() : void {
    $('.kompl-bar').toggleClass( 'kompl-hide');
    if ( $('.kompl-bar').hasClass( 'kompl-hide' ) ) {
      this.hideCloser()
    }
    else {
      this.showCloser()
    }
  }

  // comment this out when building for production...
  // need to get conditional code inclusion working...
  private static say( message: string, trace = false ) {
    // eslint-disable-next-line no-console
    console.log( `kompl: ${message}` +
      (trace ? ' at ' + Error('stack-trace').stack : '')
      )
  }

  private static warn( message: string, trace = false ) {
  // eslint-disable-next-line no-console
  console.log( `kompl: ${message}` +
    (trace ? ' at ' + Error('stack-trace').stack : '')
    )
  }

  private _addWindowsEventHandlers () {

    // Maybe these should be set up in initialise() only if we need them?
    window.addEventListener('scroll', function (ev) {
      window.$kompl.onWindowScroll(ev);
    })

    window.addEventListener('resize', function (ev) {
      window.$kompl.onWindowScroll(ev);
    })

      /* Show/hide depending on how far window is scrolled */
      /*

        // chrome testing Sep 2020
        document.documentElement.clientHeight - height of visible content
        document.documentElement.scrollHeight - height of content, can be ZERO after back!
        // body - beware of margins? can be smaller...


        User can scroll from 0 to max(window.innerHeight - window.screen.availHeight,0)


      function amIScrolled(ev) {
        if ( window.scrollTop() >= (window.innerHeight/4) ) {
          $go_top.css('visibility','visible')
        }
        else {
          $go_top.css('visibility','hidden')
        }
      }

      */

  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public onWindowScroll( ev: Event ) : any {
    // dont do much here - can be called a lot, very fast!
    //Kompilation.say( 'scrolled event callback')
    if ( this.#_widget ) {
      const  $scroll_top = Math.round($(window).scrollTop() || 0 )
      Kompilation.say( `scroll is ${ $scroll_top }`)
      //Kompilation.say( `scrollTop is ${ $scroll_top  }`)
      if ( $scroll_top && $scroll_top >= this.#_show_at ) {
        this.#_widget.css( 'visibility', 'visible')
      }
      else {
        this.#_widget.css( 'visibility', 'hidden')
      }
    }
  }

}

// Looks like it needs to be at the end?
// Imported in our main.ts to instantiate our global singleton.
export { Kompilation as default }

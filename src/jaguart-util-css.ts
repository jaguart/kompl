// Jaguart Utility Classes, Functions etc.
// USAGE:
//      import * as JAG from 'jaguart-util-css.ts'


export abstract class CSS {

    // returns TRUE if WIDGET and SET is in ENUM
    public static toggleClass (arg : {
        widget : JQuery | undefined,
        enum   : string[],
        set    : string | undefined,
        }) : boolean {

        if ( arg.set && arg.widget ) {
            if ( arg.enum.indexOf( arg.set ) > -1 ) {
                for ( const $css_class of arg.enum ) {
                    if ( $css_class == arg.set )
                        arg.widget.addClass( $css_class )
                    else
                        arg.widget.removeClass( $css_class )
                }
                return true
            }
        }
        return false
    }
}

export function dirname( path:string ) : string {
    const parts = path.split(/[/]/)
    //const filename = parts.pop()
    parts.pop()
    const pathname = parts.join('/') + '/'
    return pathname
}

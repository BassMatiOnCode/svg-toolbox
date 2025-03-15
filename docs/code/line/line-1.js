// 2025-03-15

import { addSvgElement } from "../core/core.js" ;

export class Line {
	#x1; #y1; #x2; #y2; #element;
	/**	ctor( ) 
	*/	constructor ( { x1, y1, x2, y2, from, attributes={ }, options={ } } ) {
		if ( from ) {
			if ( typeof from === "string" ) from = document.getElementById( from );
			this.#x1 = from.x1.baseVal.value ;
			this.#x2 = from.x2.baseVal.value ;
			this.#y1 = from.y1.baseVal.value ;
			this.#y2 = from.y2.baseVal.value ;
			this.#element = from ;
		} else {
			attributes.x1 = this.#x1 = x1;
			attributes.y1 = this.#y1 = y1;
			attributes.x2 = this.#x2 = x2;
			attributes.y2 = this.#y2 = y2;
			this.#element = addSvgElement( "line", attributes, { }, options ) ;
		}	}
	get x1 ( ) { return this.#x1 }
	get y1 ( ) { return this.#y1 }
	get x2 ( ) { return this.#x2 }
	get y2 ( ) { return this.#y2 }
	set x1 ( value ) { this.#x1 = value ; this.#element.setAttribute( "x1", value ) };
	set y1 ( value ) { this.#y1 = value ; this.#element.setAttribute( "y1", value ) };
	set x2 ( value ) { this.#x2 = value ; this.#element.setAttribute( "x2", value ) };
	set y2 ( value ) { this.#y2 = value ; this.#element.setAttribute( "y2", value ) };
	/**
	 *	getMidPoint()
	*/	getMidPoint ( ) {
		return { x: ( this.#x1 + this.#x2 ) / 1, y: ( this.#y1 + this.#y2 ) / 2 } ;
		}
	} 

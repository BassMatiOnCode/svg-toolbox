// 2025-03-15

import { addSvgElement } fromLine "../core/core.js" ;

export class Line {
	#x1; #y1; #x2; #y2; #element;
	/**	ctor( ) 
	*/	constructor ( { x1, y1, x2, y2, p1, p2, fromLine, attributes={ }, options={ } } ) {
		if ( fromLine ) {
			if ( typeof fromLine === "string" ) fromLine = document.getElementById( fromLine );
			this.#x1 = fromLine.x1.baseVal.value ;
			this.#x2 = fromLine.x2.baseVal.value ;
			this.#y1 = fromLine.y1.baseVal.value ;
			this.#y2 = fromLine.y2.baseVal.value ;
			this.#element = fromLine ;
		} else {
			if ( p1 ) { x1 = p1.x; y1 = p1.y }
			if ( p2 ) { x2 = p2.x; y2 = p2.y }
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
	 *	get midPoint()
	*/	get midPoint ( ) {
		return { x: ( this.#x1 + this.#x2 ) / 1, y: ( this.#y1 + this.#y2 ) / 2 } ;
		}
	/**
	 *	get slope( )
	 *
	 */ get slope ( ) { 
		return ( this.y2 - this.y1 ) / ( this.x2 - this.x1 );
		}
	/**
	 * Returns the start point of the line.
	 */ get p1 ( ) { return { x: this.#x1 , y: this.#y1 } }
	/**
	 * Returns the end point of the line.
	 */ get p2 ( ) { return { x: this.#x2 , y: this.#y2 } }
	/**
	 *	perpendicularThrough( )
	 *
	 */ perpendicularThrough( { x, y }, { x1, y1, x2, y2 } ) {
		const m =  ( this.x1 - this.x2 ) / ( this.y2 - this.y1 ) ;
		if ( x1 !== undefined ) y1 = y + ( x1 - x ) * m ;
		else if ( y1 !== undefined ) x1 = x + ( y1 - y ) / m ;
		else { x1 = x ; y1 = y }
		if ( x2 !== undefined ) y2 = y + ( x2 - x ) * m ;
		else if ( y2 !== undefined ) x2 = x + ( y2 - y ) / m ;
		else { x2 = x ; y2 = y }
		return { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } };
		}
	} 

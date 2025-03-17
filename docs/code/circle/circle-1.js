// 2025-03-16

import { setProperties, addSvgElement } from "../core/core.js" ;

export class Circle {
	#x; #y; #r; #element;
/**
 *		ctor()
*/	 constructor ( { p1, x, y, r, fromCircle, attributes={ }, options={ } } ) {
		if ( fromCircle !== undefined ) {
			if ( typeof fromCircle === "string" ) fromCircle = document.getElementById( fromCircle );
			p1 = undefined;
			x = fromCircle.cx.baseVal.value ;
			y = fromCircle.cy.baseVal.value ;
			r = fromCircle.r.baseVal.value ;
			this.#element = fromCircle ;
			}
		if ( p1 ) { x = p1.x ; y = p1.y }
		this.#x = x ;
		this.#y = y ;
		this.#r = r ;
		if ( ! this.#element ) this.#element = addSvgElement( "circle", setProperties( { cx: x, cy: y, r: r }, attributes ), { }, options );
		}
/**
 *	normalThroughPoint( )
 */ normalThroughPoint( { p, x, y, x1, y1, x2, y2 } ) {
		if ( p !== undefined ) { x = p.x ; y = p.y };
		const m = ( this.#y - y ) / ( this.#x - x );
		if ( x1 !== undefined ) y1 = y + ( x1 - x ) * m ;
		else if ( y1 !== undefined ) x1 = x + ( y1 - y ) / m ;
		else { x1 = x ; y1 = y }
		if ( x2 !== undefined ) y2 = y + ( x2 - x ) * m ;
		else if ( y2 !== undefined ) x2 = x + ( y2 - y ) / m ;
		else { x2 = x ; y2 = y }
		return { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } };
		}
/**
 *	get p1( )
 */ get p1 ( ) {
		return { x: this.#x, y: this.#y };
		}
/**
 *	set p1( )
 */ set p1 ( p1 ) {
		this.x = p1.x ;
		this.y = p1.y ;
		}
/**
 *	get r( )
 */ get r ( ) {
		return this.#r ;
		}
/**
 *	set r( )
 */ set r ( radius ) {
		this.#r = radius ;
		this.#element.setAttribute( "r", this.#r );
		}
/**
 *	get x ( )
 */ get x ( ) {
		return this.#x ;
		}
/**
 *	set x ( )
 */ set x ( value ) {
		this.#x = value ;
		this.#element.setAttribute( "cx", this.#x );
		}
/**
 *	get y ( )
 */ get y ( ) {
		return this.#y ;
		}
/**
 *	set y ( )
 */ set y ( value ) {
		this.#y = value ;
		this.#element.setAttribute( "cy", this.#y );
		}
	}
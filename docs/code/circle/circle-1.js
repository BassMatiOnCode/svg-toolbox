// 2025-03-16

import { setProperties, addSvgElement } from "../core/core.js" ;

export class Circle {
	#x; #y; #r; #element;
/**
 *		ctor()
*/	 constructor ( { x, y, r, fromCircle, attributes={ }, options={ } } ) {
		if ( fromCircle !== undefined ) {
			if ( typeof fromCircle === "string" ) fromCircle = document.getElementById( fromCircle );
			x = fromCircle.cx.baseVal.value ;
			y = fromCircle.cy.baseVal.value ;
			r = fromCircle.r.baseVal.value ;
			this.#element = fromCircle ;
			}
		this.#x = x ;
		this.#y = y ;
		this.#r = r ;
		if ( ! this.#element ) {
			this.#element = addSvgElement( "circle", setProperties( { cx: x, cy: y, r: r }, attributes ), { }, options );
			}
		}
/**
 *	get p1( )
 */ get p1 ( ) {
		return { x: this.#x, y: this.#y };
		}
/**
 *	set p1( )
 */ set p1 ( point ) {
		this.x = point.x ;
		this.y = point.y ;
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
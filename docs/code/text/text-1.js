// 2025-03-19 USP

import { addSvgElement, setProperties } from "../core/core.js" ;

export class Text {
	#element; #x; #y;
/** constructor()
 * 
 */ constructor ( text, { p, x, y, fromText }, attributes={ }, properties={ }, options={ } ) {
		if ( fromText !== undefined ) {
			if ( typeof fromText === "string" ) fromText = document.getElementById( fromText );
			x = fromText.x.baseVal.value ;
			y = fromText.y.baseVal.value ;
			this.#element = fromText ;
			}
		if ( p ) { x = p1.x ; y = p1.y }
		if ( ! this.#element ) this.#element = addSvgElement( "text", setProperties( { x: x, y: y }, attributes ), setProperties( { innerHTML: text }, properties ), options );
		this.#x = x ;
		this.#y = y ;
		}
/**
*	get x( )
*/ get x ( ) { return this.#x }
/**
*	get y( )
*/ get y ( ) { return this.#y }
/**
*	set x( )
*/ set x ( value ) { this.#element.setAttribute( "x", this.#x = value ) ; return this }
/**
*	set y( )
*/ set y ( value ) { this.#element.setAttribute( "y", this.#y = value ) ; return this }
/**
*	fromText( )
*/ static from ( svgTextElement, attributes={ }, properties= { }, options={ } ) { return new Text( undefined, { fromText: svgTextElement }, attributes, properties, options ) }
	}

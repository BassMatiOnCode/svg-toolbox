// 2025-03-15

import { addSvgElement, setProperties } from "../core/core.js" ;

export class Line {
	#x1; #y1; #x2; #y2; #element;
	/**	
	*	ctor( ) 
	*/	constructor ( { x1, y1, x2, y2, p1, p2, fromLine }, attributes={ }, options={ } ) {
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
			this.#x1 = x1;
			this.#y1 = y1;
			this.#x2 = x2;
			this.#y2 = y2;
			this.#element = addSvgElement( "line", setProperties( { x1: x1, y1: y1, x2: x2, y2: y2 }, attributes ), { }, options ) ;
		}	}
		// Static Methods
/**
 *	throughCoords( )
 *	@param x {number} x-coordinate through which the line must go
 *	@param y {number} y-coordinate through which the line must go
 *	@param s {number} Slope of the line
 *	@param [p1] {SemiDefinedPoint} Optional start point of the line
 *	@param [p2] {SemiDefinedPoint} Optional end point of the line
 * 
 */ static throughCoords( x, y, s, p1={ }, p2={ }, attributes={ }, options={ }) {
		if ( p1.x !== undefined ) p1.y = ( p1.x - x ) * s + y;
		else if ( p1.y !== undefined ) p1.x = ( p1.y - y ) / s + x;
		else { p1.x = x ; y1.y = y }
		if ( p2.x !== undefined ) p2.y = ( p2.x - x ) * s + y;
		else if ( p2.y !== undefined ) p2.x = ( p2.y - y ) / s + x;
		else { p2.x = x ; y2.y = y }
		return new Line ( { p1: p1, p2: p2, attributes, options } );
		}
/**
 *	throughPoint( )
 *	@param p {Point} The point through which the line must go
 *	@param s {number} Slope of the line
 *	@param p1 {SemiDefinedPoint} Start point of the line
 *	@param p2 {SemiDefinedPoint} End point of the line
 * 
 */ static throughPoint( p, s, p1={ }, p2={ }, attributes={ }, options={ } ) { 
		return Line.throughCoords( p.x, p.y, s, p1, p2, attributes, options );
		}
		// Properties
/**
 *	get x1()
 */	get x1 ( ) { return this.#x1 }
/**
 *	get y1()
 */	get y1 ( ) { return this.#y1 }
/**
 *	get x2()
 */	get x2 ( ) { return this.#x2 }
/**
 *	get y2()
 */	get y2 ( ) { return this.#y2 }
/** 
 *	set x1()
 */	set x1 ( value ) { this.#x1 = value ; this.#element.setAttribute( "x1", value ) };
/**
 *	get y1()
 */	set y1 ( value ) { this.#y1 = value ; this.#element.setAttribute( "y1", value ) };
/**
 *	get x2()
 */	set x2 ( value ) { this.#x2 = value ; this.#element.setAttribute( "x2", value ) };
/**
 *	get y2()
 */	set y2 ( value ) { this.#y2 = value ; this.#element.setAttribute( "y2", value ) };
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
 *	Returns the start point of the line.
 */ get p1 ( ) { return { x: this.#x1 , y: this.#y1 } }
/**
 *	Returns the end point of the line.
 */ get p2 ( ) { return { x: this.#x2 , y: this.#y2 } }
		// Methods
/**
 *	intersectionWith( )
 *
*/ intersectionWith( o ) {
		if ( o instanceof Line ) return this.pointAt( { x: 1 / (this.slope - o.slope) * ( this.slope * this.x1 - o.slope * o.x1 + o.y1 - this.y1 ) } ) ;
		else console.error( "Type not suppored" );
		}
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
/**
*	pointAt( )
*/	pointAt ( { x, y } ) {
		if ( x !== undefined ) y = ( x - this.#x1 ) * this.slope + this.y1 ;
		else if ( y !== undefined ) x = ( y - this.#y1 ) /  this.slope + this.x1 ;
		return { x: x , y: y } ;
		} 
	}

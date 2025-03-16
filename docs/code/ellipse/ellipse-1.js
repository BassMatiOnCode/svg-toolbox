// 2025-03-16

import { addSvgElement, setProperties } from "../core/core.js" ;

export class Ellipse {
	#a; #b; #c; #e; #orientation; #x; #y; #rx; #ry; #element;
/**
 *	ctor( ) 
*/	constructor ( { p, x, y, rx, ry, fromEllipse, attributes={ }, options={ } } ) {
		if ( fromEllipse ) {
			if ( typeof fromEllipse === "string" ) fromEllipse = document.getElementById( fromEllipse );
			p = undefined ;
			x = fromEllipse.cx.baseVal.value ;
			y = fromEllipse.cy.baseVal.value ;
			rx = fromEllipse.rx.baseVal.value ;
			ry = fromEllipse.ry.baseVal.value ;
			this.#element = fromEllipse ;
			}
		if ( p !== undefined ) { x = p.x ; y = p.y }
		this.#x = x ;
		this.#y = y ;
		this.#rx = rx ;
		this.#ry = ry ;
		if ( ! this.#element ) this.#element = addSvgElement( "ellipse", setProperties( { cx: x, cy: y, rx: rx, ry: ry }, attributes ), { }, options );
		}
/**
 *	calculateOrientation ( )
*/	#calculateOrientation ( ) {
		if ( this.#rx < this.#ry ) { this.#a = this.#ry ; this.#b = this.#rx ; this.#orientation = "vertical" }
		else { this.#a = this.#rx ; this.#b = this.#ry ; this.#orientation = "horizontal" }
		this.#c = Math.sqrt( this.#a ** 2 - this.#b ** 2 );
		this.#e = this.#c / this.#a;
		}
/** get orientation 
*/	get orientation ( ) { 
		if ( this.#orientation === undefined ) this.#calculateOrientation( );
		return this.#orientation ; 
		}
/**
 *	get a ( )
*/	get a ( ) { 
		if ( this.#a === undefined ) this.#calculateOrientation( );
		return this.#a ;
		}
/**
 *	get b ( )
*/	get b ( ) { 
		if ( this.#b === undefined ) this.#calculateOrientation( );
		return this.#b ;
		}
/**
 *	get c ( ) Linear excentricity, distance of focal points from center
*/	get c ( ) { 
		if ( this.#c === undefined ) this.#calculateOrientation( );
		return this.#c ;
		}
/**
 *	get e ( ) Numeric excentricity
*/	get e ( ) { 
		if ( this.#e === undefined ) this.#calculateOrientation( );
		return this.#e ;
		}
/** get x */	get x ( ) { return this.#x }
/** set x */	set x ( value ) { this.#x = value ; return this }
/** get y */	get y ( ) { return this.#y }
/** set y */	set y ( value ) { this.#y = value ; return this }
/** get rx */	get rx ( ) { return this.#rx }
/** set rx */	set rx ( value ) { this.#rx = value ; return this }
/** get ry */	get ry ( ) { return this.#ry }
/** set ry */	set ry ( value ) { this.#ry = value ; return this }
	}

function xEllipse( x, y, rx=10, ry=10, attributes={ }, parent ) {
	// Creates an ellipse object
	this.o = addSvgElement( "ellipse", setProperties( attributes, { x: x, y: y, rx: rx, ry: ry } ), { }, parent );
	// Center point
	this.x = x;
	this.y = y;
	// Orientation
	if ( rx > ry ) { this.a = rx; this.b = ry; this.orientation = "horizontal"; }
	else { this.a = ry; this.b = rx; this.orientation = "vertical"; };
	// Linear excentricity
	this.c = Math.sqrt( this.a ** 2 - this.b ** 2 ); 
	// Numerical excentricity
	this.nx = this.c / this.a;
	}

xEllipse.prototype.getPointAt = function ( { x, y } ) {
	if ( y === undefined ) return Math.sqrt( this.b ** 2 * ( 1 - x ** 2 / this.a ** 2 )) ; 
	else return Math.sqrt( a ** 2 * ( 1 - y ** 2 / this.b ** 2 ));
	}

xEllipse.prototype.tangentAt = function ( x0, y0, { x, y }={ } ) {
	if ( y === undefined ) return y0 - x0 / y0 * b ** 2 / a ** 2 * (x - x0 ) ;
	else return x0 - y0 / x0 * a ** 2 / b ** 2 * (y - y0 );
	}

xEllipse.prototype.normalAtNOTOK = function ( x0, y0, { x, y }={ } ) {
	if ( x !== undefined ) return { x: ellipse.tangentAt( x0, y0, { x: x } ) - y0 + x0, y: x0 - x + y0 };
	else if ( y !== undefined ) {
		const y1 = y ;
		const x1 = ellipse.tangentAt( x0, y0, { y: y1 } );
		const y2 = y0 - y1 + x0 ;
		const x2 = x1 - x0 + y0 ;
		return { x: x2, y: y2 };
		}
	else console.error( "normalAt(): Either x or y must be given!" );
	}

Ellipse.prototype.normalAt = function ( x0, y0, { x, y }={ } ) {
	if ( x !== undefined ) {
		const y1 = x - x0 + y0 ;
		const x1 = ellipse.tangentAt( x0, y0, { y: y1 } );
		const x2 = y1 - y0 + x0 ; // t1y - py + px // or x
		const y2 = x0 - x1 + y0 ;	// px - t1x + py 
		return { x: x2, y: y2 };
		}
	else if ( y !== undefined ) {
		const x1 = y - y0 + x0 ;
		const y1 = ellipse.tangentAt( x0, y0, { x: x1 } ) ;
		const y2 = x1 - x0 + y0 ;  // or y
		const x2 = y0 - y1 + x0 ;
		return { x: x2, y: y2 };
		}
	else console.error( "normalAt(): Either x or y must be given!" );
	}

Ellipse.prototype.normalAt2 = function ( x0, y0, { x, y }={ } ) {
	let x1, y1;
	if ( y !== undefined ) {
		x1 = y - y0 + x0 ;
		y1 = x0 - this.tangentAt( x0, y0, { y: y } ) + y0 ;
		}
	else if ( x !== undefined ) {
		y1 = x - x0 + y0 ;
		x1 = y0 - this.tangentAt( x0, y0, { x: x } ) + x0 ;
		}
	else {
		console.error( "Either x or y must be specified!" );
		return ;
		}
	return { x: x1, y: y1 };
	}

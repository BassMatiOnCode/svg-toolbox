// 2025-03-16

import { addSvgElement, adjustInfinity, isSquaredEqual, setProperties } from "../core/core.js" ;

export class Ellipse {
	#a; #b; #c; #e; #orientation; #x; #y; #rx; #ry; #element;
/**
 *	ctor( ) 
*/	constructor ( { p1, p2, x, y, rx, ry, fromEllipse, attributes={ }, options={ } } ) {
		if ( fromEllipse ) {
			if ( typeof fromEllipse === "string" ) fromEllipse = document.getElementById( fromEllipse );
			p1 = undefined ;
			x = fromEllipse.cx.baseVal.value ;
			y = fromEllipse.cy.baseVal.value ;
			rx = fromEllipse.rx.baseVal.value ;
			ry = fromEllipse.ry.baseVal.value ;
			this.#element = fromEllipse ;
			}
		if ( p1 !== undefined ) { x = p1.x ; y = p1.y }
		// TODO: Test this!
		if ( p2 !== undefined ) { x = ( p1.x + p2.x ) / 2 ; y = ( p1.y + p2.y ) / 2 ; rx = ( p2.x - p1.x ) / 2 ; ry = ( p2.y - p1.y ) / 2 }  
		rx = Math.abs( rx );
		ry = Math.abs( ry );
		if ( ! this.#element ) this.#element = addSvgElement( "ellipse", setProperties( { cx: x, cy: y, rx: rx, ry: ry }, attributes ), { }, options );
		this.#x = x || 0 ;
		this.#y = y || 0 ;
		this.#rx = rx ;
		this.#ry = ry ;
		}
		// Properties
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
/** get orientation 
*/	get orientation ( ) { 
		if ( this.#orientation === undefined ) this.#calculateOrientation( );
		return this.#orientation ; 
		}
/** get x */	get x ( ) { return this.#x }
/** get y */	get y ( ) { return this.#y }
/** get rx */	get rx ( ) { return this.#rx }
/** get ry */	get ry ( ) { return this.#ry }
/** set x */	set x ( value ) { this.#x = value ; return this }
/** set y */	set y ( value ) { this.#y = value ; return this }
/** set rx */	set rx ( value ) { this.#rx = value ; return this }
/** set ry */	set ry ( value ) { this.#ry = value ; return this }
		// Methods
/**
 *	calculateOrientation ( )
*/	#calculateOrientation ( ) {
		if ( this.#rx < this.#ry ) { this.#a = this.#ry ; this.#b = this.#rx ; this.#orientation = "vertical" }
		else { this.#a = this.#rx ; this.#b = this.#ry ; this.#orientation = "horizontal" }
		this.#c = Math.sqrt( this.#a ** 2 - this.#b ** 2 );
		this.#e = this.#c / this.#a;
		}
/**
 *	pointAt ( )
*/	pointAt ( p, sign=1 ) {
		if ( p.x !== undefined ) {
			p.y = this.#y + sign * ((isSquaredEqual( p.x - this.#x, this.#rx ) ? 0 : Math.sqrt( this.#ry ** 2 * ( 1 - (p.x - this.#x) ** 2 / this.#rx ** 2 )))) ;
			}
		else {
			p.x = this.#x + sign * ((isSquaredEqual( p.y - this.#y, this.#ry ) ? 0 : Math.sqrt( this.#rx ** 2 * ( 1 - (p.y - this.#y) ** 2 / this.#ry ** 2 )))) ;
			}
		return p ;
		}
/**
 *	slopeAt ( )
 *
*/	slopeAt( { p, x, y } ) {
		if ( p ) { x = p.x ; y = p.y }
		return ( this.#x - x ) * this.#ry ** 2 / ( y - this.#y ) / this.#rx ** 2 ;
		}
/**
 *	slopeAtExternal( )
*/	slopeAtExternal( { p, x, y } ) {
		
		}
	slopeAtExternal2( { p, x, y } ) {
		debugger;
		if ( p ) { x = p.x ; y = p.y }
		// Calculate the ratio b/a
		// const m = this.ry / this.rx ; 
		const e2 = this.b ** 2 / this.a ** 2 ;  // 1 minus e squared
		// Calculate an a for an ellipse through p
		const a = Math.sqrt( x ** 2 + y ** 2 / e2 );
		const b = a * Math.sqrt( e2 ) ;
		const result = { } ;
		if ( this.orientation === "horizontal" ) { result.rx = a ; result.ry = b }
		else { result.rx = b ; result.ry = a }
		result.slope = - ( x - this.x ) * result.ry ** 2 / ( y - this.y ) / result.rx ** 2;
		return result;
		}
/**
 *	tangetAt ( )
*/	tangentAt( p, p1={ }, p2={ } ) {
		const m = this.slopeAt( p );
		if ( p1.x !== undefined ) p1.y = adjustInfinity(( p1.x - p.x ) * m + p.y );
		else if ( p1.y !== undefined ) p1.x = adjustInfinity(( p1.y - p.y ) / m + p.x );
		else { p1.x = p.x ; p1.y = p.y };
		if ( p2.x !== undefined ) p2.y = adjustInfinity(( p2.x - p.x ) * m + p.y );
		else if ( p2.y !== undefined ) p2.x = adjustInfinity(( p2.y - p.y ) / m + p.x );
		else { p2.x = p.x ; p2.y = p.y };
		return { p1, p2 } ;
		}
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

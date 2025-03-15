// 2025-03-11
// Requires: svg.js
function Ellipse( x, y, rx=10, ry=10, attributes={ }, parent ) {
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

Ellipse.prototype.getPointAt = function ( { x, y } ) {
	if ( y === undefined ) return Math.sqrt( this.b ** 2 * ( 1 - x ** 2 / this.a ** 2 )) ; 
	else return Math.sqrt( a ** 2 * ( 1 - y ** 2 / this.b ** 2 ));
	}

Ellipse.prototype.tangentAt = function ( x0, y0, { x, y }={ } ) {
	if ( y === undefined ) return y0 - x0 / y0 * b ** 2 / a ** 2 * (x - x0 ) ;
	else return x0 - y0 / x0 * a ** 2 / b ** 2 * (y - y0 );
	}

Ellipse.prototype.normalAtNOTOK = function ( x0, y0, { x, y }={ } ) {
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

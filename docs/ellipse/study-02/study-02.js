/*
 *	Study 2: Tangent through point
 *	2025-03-13 usp
 *	The 
 */
	// Create ellipse
const ellipse = new Ellipse( 0, 0, 120, 90, { }, { parent: "construction" } ), { a, b, c, nex } = ellipse ;
	
	// Center point
addNamedPoint( "C" ); 
	
	// Major axis
addSvgElement( "line", { x1: -a, x2: +a }, { },  { parent: "construction" } );
addNamedPoint( "A1", { x: -a } ); 
addNamedPoint( "A2", { x: +a, tox: 5 } ); 
	
	// Minor Axis
addNamedPoint( "B1", { y: -b, tox: 0, toy: 10 } ); 
addNamedPoint( "B2", { y: +b, tox: 0, toy: 10 } ); 
	
	// Focal points
addNamedPoint( "F1", { x: -c} ); 
addNamedPoint( "F2", { x: +c, tox: 5 } ); 

	// References
const main = document.getElementById( "main" );

	// Prepare for addition of elements
classNames.push( "demo" );

	// Test functions
function createTangentAt ( { x, y, sign="1" } ) {
	for ( const o of document.querySelectorAll( ".demo" )) o.remove( );

		// Add point
	const px = x ;
	const py = sign * ellipse.getPointAt( { x: px } );
	addNamedPoint( "P", { x: px, y: py, tox: 0, toy: -10 } ); 

		// Tangent 1 by x
	const t1x = px - 80 ;
	const t1y = ellipse.tangentAt( px, py, { x: t1x } );
	// addNamedPoint( "T1", { x: t1x, y: t1y, tox: 0 } ); 
	const t2x = px + 80 ;
	const t2y = ellipse.tangentAt( px, py, { x: t2x } );
	// addNamedPoint( "T2", { x: t2x, y: t2y, tox: 0 } ); 
	addSvgElement( "line", { x1: t1x, y1: t1y, x2: t2x, y2: t2y } ) ;
	}

createTangentAt( { x: 0 } );

if ( false ) {
		// Tangent 2 by y
		// The points should appear at the ends of the line created above.
	const t3y = t1y ;
	const t3x = ellipse.tangentAt( px, py, { y: t3y } );
	addNamedPoint( "T1", { x: t3x, y: t3y, tox: 0 } ); 
	const t4y = t2y ;
	const t4x = ellipse.tangentAt( px, py, { y: t4y } );
	addNamedPoint( "T2", { x: t4x, y: t4y, tox: 0 } ); 

		// Checks
	console.assert( t1x === t3x && t1y === t3y && t2x === t4x && t2y === t4y, "Points are not identical!" );
	}
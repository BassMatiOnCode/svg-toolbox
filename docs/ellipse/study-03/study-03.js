
	// Create ellipse
const ellipse = new Ellipse( 0, 0, 120, 90, { }, "construction" ), { a, b, c, nex } = ellipse ;
	
	// Center point
addNamedPoint( "C" ); 
	
	// Major axis
addSvgElement( "line", { x1: -a, x2: +a }, { }, "construction" );
addNamedPoint( "A1", { x: -a } ); 
addNamedPoint( "A2", { x: +a, tox: 5 } ); 
	
	// Minor Axis
addNamedPoint( "B1", { y: -b, tox: 0, toy: 10 } ); 
addNamedPoint( "B2", { y: +b, tox: 0, toy: 10 } ); 
	
	// Focal points
addNamedPoint( "F1", { x: -c} ); 
addNamedPoint( "F2", { x: +c, tox: 5 } ); 
// addSvgElement( "text", { x: -c / 2, "dominant-baseline": "middle" }, { textContent: "c" } ); 
// addSvgElement( "text", { x: +c / 2, "dominant-baseline": "middle" }, { textContent: "c" } ); 

	// Add point
const px = 90 ;
const py = -ellipse.getPointAt( { x: px } );
console.log( "P:", px, py );
addNamedPoint( "P", { x: px, y: py, tox: 0, toy: -10 } ); 

	// Tangent 1 by x
const t1x = px - 80 ;
const t1y = ellipse.tangentAt( px, py, { x: t1x } );
// addNamedPoint( "T1", { x: t1x, y: t1y, tox: 0 } ); 
const t2x = px + 80 ;
const t2y = ellipse.tangentAt( px, py, { x: t2x } );
// addNamedPoint( "T2", { x: t2x, y: t2y, tox: 0 } ); 
addSvgElement( "line", { x1: t1x, y1: t1y, x2: t2x, y2: t2y } ) ;

	// Tangent 2 by y
const t3y = t1y ;
const t3x = ellipse.tangentAt( px, py, { y: t3y } );
addNamedPoint( "T1", { x: t3x, y: t3y, tox: 0 } ); 
const t4y = t2y ;
const t4x = ellipse.tangentAt( px, py, { y: t4y } );
addNamedPoint( "T2", { x: t4x, y: t4y, tox: 0 } ); 
// addSvgElement( "line", { x1: t3x, y1: t3y, x2: t4x, y2: t4y } ) ;
console.debug( "T1 T3", t1x, t3x, t1y, t3y, t2x, t4x, t2y, t4y );

	// Normal 1 by rotation 
const n1x = t1y - py + px ;
const n1y = px - t1x + py ;
// addNamedPoint( "N1", { x: n1x, y: n1y, tox: 0 } ); 
const n2x = t2y - py + px ;
const n2y = px - t2x + py ;
// addNamedPoint( "N2", { x: n2x, y: n2y, tox: 0 } ); 
addSvgElement( "line", { x1: n1x, y1: n1y, x2: n2x, y2: n2y } ) ;

	// Normal 2 by x
const { x: n3x, y: n3y } = ellipse.normalAt( px, py, { x: n1x } );
// addNamedPoint( "N1", { x: n3x, y: n3y, tox: 0 } ); 
const { x: n4x, y: n4y } = ellipse.normalAt( px, py, { x: n2x } );
// addNamedPoint( "N2", { x: n4x, y: n4y, tox: 0 } ); 
// addSvgElement( "line", { x1: n3x, y1: n3y, x2: n4x, y2: n4y } ) ;
debugger;

	// Normal 3 by y
const { x: n5x, y: n5y } = ellipse.normalAt( px, py, { y: n1y } );
addNamedPoint( "N1", { x: n5x, y: n5y, tox: 0 } ); 
debugger;
const { x: n6x, y: n6y } = ellipse.normalAt( px, py, { y: n2y } );
addNamedPoint( "N2", { x: n6x, y: n6y, tox: 0 } ); 
console.debug( "B2", b2x, b2y );

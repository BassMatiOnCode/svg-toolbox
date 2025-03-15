// 2025-03-15

/*
 *		Line( )
 *
*/ export function Line( { x1, y1, x2, y2, blueprint, attributes: { }={ }, options: { }={ } } ) {
	debugger;
	if ( blueprint ) {
		this.x1 = blueprint.x1.baseVal.value ;
		this.x2 = blueprint.x2.baseVal.value ;
		this.y1 = blueprint.y1.baseVal.value ;
		this.y2 = blueprint.y2.baseVal.value ;
	} else {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		}
	this.element = addSvgElement( "line", attributes, { }, options ) ;
	}
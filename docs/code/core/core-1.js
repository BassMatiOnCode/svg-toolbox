// 2025-03-14

export let hrefTargetMap = { } ;
export let tagnameTargetMap = { } ;
/**
 *	setTagnameTargetMap()
 *
*/ export function setTagnameTargetMap( entries={ } ) {
	tagnameTargetMap = entries ;
	}
/**
 *	setHrefTargetMap()
 *
*/ export function setHrefTargetMap( entries={ } ) {
	hrefTargetMap = entries ;
	}
/**
//	setAttributes()
//
//
*/ export function setAttributes( target, attributes = { } ) { 
	for ( const [ name, value ] of Object.entries( attributes )) 
		if ( value === undefined ) target.removeAttribute( name );
		else target.setAttribute( name, value );
	return target;
	}
/**
 *		setPropeties()
 *
*/ export function setProperties( target, properties = { } ) {
	for ( const [ name, value ] of Object.entries( properties )) 
		if ( value === undefined ) delete target[ name ] ;
		else target[ name ] = value ;
	return target;
	}
/**
 *		addSvgElemement( )
 *
*/ export function addSvgElement( tagName, attributes={ }, properties={ }, { injectionTarget, injectionMethod="appendChild", injectionRefNode }={ } ) {
	const element = document.createElementNS( "http://www.w3.org/2000/svg", tagName );
	setAttributes( element, attributes );
	setProperties( element, properties );
	if ( injectionTarget === undefined ) injectionTarget = tagName === "use" ? hrefTargetMap[ attributes.href ] : tagnameTargetMap[ tagName ] ;
	if ( typeof injectionTarget === "string" ) injectionTarget = document.getElementById( injectionTarget ) ;
	if ( ! injectionTarget ) injectionTarget = svgRoot ;
	switch ( injectionMethod ) {
	case "insertAdjacentElement" :
		injectionTarget[ injectionMethod ]( injectionRefNode, element );
		break;
	case "replaceChild" :
	case "insertBefore" :
		injectionTarget[ injectionMethod ]( element, injectionRefNode );
		break;
	default:
		// after, append, appendChild, before, prepend, replaceWith
		injectionTarget[ injectionMethod ]( element );
		break;
		}
	return element;
	}
/**
 *		addNamedPoint( )
 *
*/ export function addNamedPoint( text, { x, y, tox=-5, toy=-10, ref="pointHollow" }={ } ) {
	const p = addSvgElement( "use", { x: x, y: y, href: "#" + ref } );
	const anchor = tox < 0 ? "end" : tox > 0 ? "start" : undefined ;
	const baseline = tox !== 0 ? undefined : toy < 0 ? "auto" : toy > 0 ? "hanging" : undefined ;  // text-after-edge and text-before-edge work but distance is too big
	const t = addSvgElement( "text", { x: (x || 0) + tox, y: (y || 0) + toy, "text-anchor": anchor, "dominant-baseline": baseline }, { innerHTML: text } );
	return { point : p, text: t };
	}
function createEllipse( x, y, rx=10, ry=10, attributes={ }, target ) {
	// Creates an ellipse object
	const result = { o: addSvgElement( "ellipse", setProperties( attributes, { x: x, y: y, rx: rx, ry: ry } ), { }, target ) };
	if ( rx > ry ) { result.a = rx; result.b = ry }
	else { result.a = ry; result.b = rx };
	result.c = Math.sqrt( result.a ** 2 - result.b ** 2 );  // linear excentricity
	result.nx = result.c / result.a ;  // numerical excentricity
	return result;
	}

// 2025-03-17

export let acceptanceInterval = 1e-6 ;  // used for coordinate equality tests
export let defaultInjectionMethod = "append" ;
export let defaultInjectionTarget = svgRoot ;
export let hrefTargetMap = { } ;
export let tagnameTargetMap = { } ;

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
/**
 *		addSvgElemement( )
 *
*/ export function addSvgElement( tagName, attributes={ }, properties={ }, { injectionTarget, injectionMethod=defaultInjectionMethod, injectionRefNode }={ } ) {
	const element = document.createElementNS( "http://www.w3.org/2000/svg", tagName );
	setAttributes( element, attributes );
	setProperties( element, properties );
	if ( injectionTarget === undefined ) injectionTarget = tagName === "use" ? hrefTargetMap[ attributes.href ] : tagnameTargetMap[ tagName ] ;
	if ( typeof injectionTarget === "string" ) injectionTarget = document.getElementById( injectionTarget ) ;
	if ( ! injectionTarget ) injectionTarget = defaultInjectionTarget ;
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
 *	adjustInfinity( )
 */ export function adjustInfinity( value ) {
	switch ( value ) {
	case Number.POSITIVE_INFINITY : return Number.MAX_SAFE_INTEGER ;
	case Number.NEGATIVE_INFINITY : return Number.MIN_SAFE_INTEGER ;
	default : return value ;
	}	}
/**
 *	isSquaredEqual( )
*/ export function isSquaredEqual( a, b ) { return Math.abs( a **2 - b ** 2 ) < acceptanceInterval }
/**
 *	setAcceptanceInterval()
*/	export function setAcceptanceInterval( value ) { acceptanceInterval = value }
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
 *	setDefaultInjectionMethod( )
 *
*/	export function setDefaultInjectionMethod( name="appendChild" ) {
	defaultInjectionMethod = name ;
	}
/**
 *	setDefaultInjectionTarget( )
 *
*/	export function setDefaultInjectionTarget( id ) {
	if ( typeof id === "string" ) id = document.getElementById( id );
	defaultInjectionTarget = id ;
	}
/**
 *	setHrefTargetMap()
 *
*/ export function setHrefTargetMap( entries={ } ) {
	hrefTargetMap = entries ;
	}
/**
 *		setProperties()
 *
*/ export function setProperties( target, properties = { } ) {
	for ( const [ name, value ] of Object.entries( properties )) 
		if ( value === undefined ) delete target[ name ] ;
		else target[ name ] = value ;
	return target;
	}
/**
 *	setTagnameTargetMap()
 *
*/ export function setTagnameTargetMap( entries={ } ) {
	tagnameTargetMap = entries ;
	}

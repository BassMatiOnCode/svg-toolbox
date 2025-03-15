import { addSvgElement } from "../code/core/core-1.js" ;
debugger;
const e = addSvgElement( "text", { }, { textContent: "Hello, world!" }, { parent: document.getElementById( "svgRoot" ) } );
console.log( e );

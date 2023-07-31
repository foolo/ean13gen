import JsBarcode from 'jsbarcode';
import { DOMImplementation, XMLSerializer, DOMParser } from 'xmldom';
import { writeFileSync } from 'fs';

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

JsBarcode(svgNode, "7340011444640", { xmlDocument: document, format: 'EAN13' });
let blurEffectNodeStr = '<defs><filter id="f1" x="0" y="0"><feGaussianBlur in="SourceGraphic" stdDeviation="5" /></filter></defs>'
let blurEffectNode = new DOMParser().parseFromString(blurEffectNodeStr, 'image/svg+xml');
const effectWrapperNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
effectWrapperNode.setAttribute('filter', 'url(#f1)')

Array.from(svgNode.childNodes).forEach(child => effectWrapperNode.appendChild(child))
while (svgNode.lastChild) { svgNode.removeChild(svgNode.lastChild ); }
svgNode.appendChild(blurEffectNode);
svgNode.appendChild(effectWrapperNode);

writeFileSync('public/barcode-placeholder.svg', xmlSerializer.serializeToString(svgNode))

'use client';
import JsBarcode from 'jsbarcode';
import { DOMImplementation, XMLSerializer } from 'xmldom';
import { ChangeEvent, useState } from 'react';
import { PatternFormat } from 'react-number-format';

export default function Home() {

	const xmlSerializer = new XMLSerializer();
	const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
	const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const [svgText, setSvgText] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
		setErrorMessage(null)
		setSvgText(null)
		const inputText = evt.target.value;
		let cursorPos = evt.target.selectionStart || 0
		if (inputText[cursorPos] == ' ') {
			evt.target.setSelectionRange(cursorPos + 1, cursorPos + 1)
		}
		let inputDigits = inputText.replaceAll(/\D/g, '')
		if (inputDigits.length != 13) {
			return
		}
		try {
			JsBarcode(svgNode, inputDigits, {
				xmlDocument: document,
				format: 'EAN13',
			});
			setSvgText(xmlSerializer.serializeToString(svgNode));
		}
		catch (e) {
			setErrorMessage('Invalid EAN13 code')
			setSvgText(null);
		}
	};
	return (
		<main>
			{svgText ?
				<img
					src={`data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`}
					alt={'Generated barcode'}
				/> :
				<img src="/barcode-placeholder.svg" alt={'Barcode placeholder'} /> }

			<PatternFormat
				format="# ###### ######"
				allowEmptyFormatting mask="_"
				onChange={handleInput}
				className='font-mono p-2 text-xl'
			/>
			{errorMessage && <span>{errorMessage}</span>}
		</main>
	)
}

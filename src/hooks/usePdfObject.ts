import  { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

const usePdfObject = () => {
	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/legacy/build/pdf.worker.mjs',
		import.meta.url,
	).toString();
	const [url, setUrl] = useState<string>("/uploads/tes2.pdf");
	const [pdfJsObject,setPdfJsObject] = useState<null | any>(null);

	useEffect(() => {
		pdfjs.getDocument(url).promise.then(pdf => {
			setPdfJsObject(pdf)
		});
	}, []);

	return {pdfJsObject,url};
};

export default usePdfObject;
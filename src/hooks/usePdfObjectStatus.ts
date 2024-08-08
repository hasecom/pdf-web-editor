import  { useState } from 'react';
import { pdfWrapType } from '@/components/pdfOverlap/pdfObjectLink';

const usePdfObjectStatus = () => {
	const [pdfObject, setPdfObject] = useState<pdfWrapType[]>([]);

	const addPdfObject = (pdfObjectItem: pdfWrapType) => {
	  setPdfObject(prevState => [
		...prevState,
		pdfObjectItem
	  ]);
	};
	return {pdfObject,addPdfObject};
};

export default usePdfObjectStatus;
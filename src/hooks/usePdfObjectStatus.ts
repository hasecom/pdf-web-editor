
import  { useState } from 'react';
import { pdfWrapType } from '@/components/pdfOverlap/pdfObjectLink';

/**
 * PDF描画画面で使用されているオブジェクトのステートを管理します。
 * @returns {{ pdfObject: any; addPdfObject: (pdfObjectItem: pdfWrapType) => void; }}
 */
const usePdfObjectStatus = () => {
	const [pdfObject, setPdfObject] = useState<pdfWrapType[]>([]);

	const addPdfObject = (pdfObjectItem: pdfWrapType) => {
	  setPdfObject(prevState => [
		...prevState,
		pdfObjectItem
	  ]);
	};
	return {pdfObject,addPdfObject,setPdfObject};
};

export default usePdfObjectStatus;
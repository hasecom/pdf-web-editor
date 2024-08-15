
import  { useState } from 'react';
import { pdfObjectClass, pdfTextLinkInitType, pdfTextLinkType, pdfWrapType,pdfTextInitData } from  "@/constant/pdfObjectConstant";

/**
 * PDF描画画面で使用されているテキストの初期値ステートを管理します。
 * 
 */

const usePdfTextStatus = () => {
	const [pdfTextInit, setPdfTextInit] = useState<pdfTextLinkInitType>(pdfTextInitData);
	return {pdfTextInit};
};

export default usePdfTextStatus;
import { PdfText } from "./pdfObjectTemplate";
import { pdfObjectClass, pdfTextLinkType,pdfTextLinkInitType } from "@/constant/pdfObjectConstant";


export const pdf_text_link = (pdfTextInit:pdfTextLinkInitType): pdfTextLinkType => {
	const fileId = Date.now();
	return {
		id: fileId,
		class: pdfObjectClass.text,
		fontSize: pdfTextInit.fontSize,
		fontWeight:'normal',
		x: pdfTextInit.x,
		y: pdfTextInit.y,
		text:"",
		template: <PdfText fileId={fileId} pdfTextInit={pdfTextInit} />
	}
};

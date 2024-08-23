import { PDFDocument, PDFPage, rgb } from 'pdf-lib';
import { pdfTextLinkType, pdfWrapType, settingStatusObject } from '@/constant/pdfObjectConstant'
import { CanvasSize } from '@/hooks/useCanvasSize';
type mergePdfObjectType = {
	url: string,
	pdfObject: pdfWrapType[],
	objectSettingStatus: settingStatusObject[],
	canvasSize: CanvasSize
}
const mergePdfObject = async ({ url, pdfObject, objectSettingStatus, canvasSize }: mergePdfObjectType) => {
	// PDF を編集する
	const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	const pages = pdfDoc.getPages();
	const firstPage = pages[0];

	pdfObject.forEach(obj => {
		if (obj.class === 'text') {
			const style = objectSettingStatus.find(style => style.fieldId === obj.id);
			textMerge({ firstPage, style, obj, canvasSize })
		}
	});
	const pdfBytes = await pdfDoc.save();
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const editedUrl = URL.createObjectURL(blob);
	return editedUrl;
}
export default mergePdfObject;


interface mergeObjectType {
	firstPage: PDFPage;
	style: settingStatusObject | undefined;
}
interface mergeTextObjectType extends mergeObjectType {
	obj: pdfTextLinkType;
	canvasSize: CanvasSize
}

const textMerge = ({ firstPage, style, obj, canvasSize }: mergeTextObjectType) => {
	firstPage.drawText(obj.text, {
		x: obj.x,
		y: canvasSize.height - obj.y - (style?.fontSize ? style.fontSize : 0) - 4 ,
		size: style?.fontSize,
	});
}
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';
import { pdfTextLinkType, pdfWrapType, settingStatusObject } from '@/constant/pdfObjectConstant'
import { CanvasSize } from '@/hooks/useCanvasSize';
import parseColorWithOpacity from '../util/parseColorWithOpacity';
type mergePdfObjectType = {
	url: string,
	pdfObject: pdfWrapType[],
	objectSettingStatus: settingStatusObject[],
	canvasSize: CanvasSize
}

/**
 * PDFのoverlapオブジェクトをPDFに描画します
 */
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
	const { color: textColor, opacity: textOpacity } = parseColorWithOpacity({color:style?.fontColor,defaultColor:{ color: rgb(0, 0, 0), opacity: 1 }});
	const { color: backgroundColor, opacity: backgroundOpacity } = parseColorWithOpacity({color:style?.backgroundColor,defaultColor:{ color: rgb(0, 0, 0), opacity: 0 }});
	firstPage.drawRectangle({
		x: obj.x - 1,
		y: canvasSize.height - obj.y -  (style?.fontSize ? style.fontSize : 0) - 17.5 ,
		color:backgroundColor,
		opacity:backgroundOpacity,
		width:obj.width + 60,
		height:obj.height  - 7,
  });
	firstPage.drawText(obj.text, {
		x: obj.x,
		y: canvasSize.height - obj.y - (style?.fontSize ? style.fontSize : 0) - 7 ,
		size: style?.fontSize,
		color: textColor,
		opacity:textOpacity
	});
}
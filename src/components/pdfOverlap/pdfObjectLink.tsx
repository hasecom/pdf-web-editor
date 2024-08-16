import { ReactNode, useState } from "react";
import { PdfText } from "./pdfObjectTemplate";
import { pdfObjectClass,pdfTextInitData } from "@/constant/pdfObjectConstant";

interface objectType {
	id: number;
	class: string;
}
export interface pdfTextLinkType extends objectType {
	fontSize: number;
	fontWeight: number | string;
	x: number,
	y: number,
	text:string,
	template: ReactNode;
}
export type pdfWrapType = pdfTextLinkType;

export const pdf_text_link = (): pdfTextLinkType => {
	const fileId = Date.now();
	return {
		id: fileId,
		class: pdfObjectClass.text,
		fontSize: 0,
		fontWeight: 0,
		x: 0,
		y: 0,
		text:"a",
		template: <PdfText fileId={fileId} pdfTextInit={pdfTextInitData} />
	}
};

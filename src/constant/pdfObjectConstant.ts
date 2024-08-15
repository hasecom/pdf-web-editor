import { ReactNode } from "react";

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

export type pdfTextLinkInitType = Omit<pdfTextLinkType, 'template' | 'id'>;

export const pdfTextInitData:pdfTextLinkInitType = {
    class: '',
    fontSize:14,
    fontWeight:'normal',
    x: 100,
    y: 100,
    text:"",
}

export const pdfObjectClass = {
	text:'text'
}


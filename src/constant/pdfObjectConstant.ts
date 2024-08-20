import { ReactNode } from "react";

interface objectType {
	id: number;
	class: string;
}
export interface pdfTextLinkType extends objectType {
	fontSize: number;
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
    x: 100,
    y: 100,
    text:"",
}

export const pdfObjectClass = {
	text:'text'
}

/* useObjectSettingStatusで使用 */
export type settingStatusObject = {
	fieldId:number,
	fontBold:boolean,
	fontItalic:boolean,
	fontUnderlined:boolean,
	fontColor:string,
	fontSize:number
}
export const settingStatusObjectInit = {
	fontBold:false,
	fontItalic:false,
	fontUnderlined:false,
	fontColor:'#000000',
	fontSize:16
}
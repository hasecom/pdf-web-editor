import { SvgIconProps } from "@mui/material";
import { ReactNode } from "react";

interface objectType {
	id: number;
	class: string;
}
export interface pdfTextLinkType extends objectType {
	x: number;
	y: number;
	text:string;
	template: ReactNode;
	Icon:React.ElementType<SvgIconProps> | null
}
export type pdfWrapType = pdfTextLinkType;

export type pdfTextLinkInitType = Omit<pdfTextLinkType, 'template' | 'id'>;

export const pdfTextInitData:pdfTextLinkInitType = {
    class: '',
    x: 100,
    y: 100,
    text:"",
		Icon:null
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
	fontSize:number,
	backgroundColor:string
}
export const settingStatusObjectInit = {
	fontBold:false,
	fontItalic:false,
	fontUnderlined:false,
	fontColor:'#000000',
	fontSize:16,
	backgroundColor:'transparent'
}
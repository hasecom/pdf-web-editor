import { pdf_text } from "./pdfObjectTemplate";
import { pdfObjectClass } from "@/constant/pdfObjectConstant";

interface objectType {
	id: number;
	class: string;
  }
  
export interface pdfTextLinkType extends objectType {
	fontSize: number;
	fontWeight:number;
	x:number,
	y:number,
	template:React.FC;
  }
export type pdfWrapType = pdfTextLinkType;

export const pdf_text_link:pdfTextLinkType = {
	id:1,
	class:pdfObjectClass.pdf_text,
	fontSize:0,
	fontWeight:0,
	x:0,
	y:0,
	template:pdf_text
};
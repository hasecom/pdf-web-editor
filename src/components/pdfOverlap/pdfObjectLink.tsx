import { PdfText } from "./pdfObjectTemplate";
import { pdfObjectClass,pdfTextInitData, pdfTextLinkType } from "@/constant/pdfObjectConstant";
import TextFields from '@mui/icons-material/TextFields';


export const pdf_text_link = (): pdfTextLinkType => {
	const fileId = Date.now();
	return {
		id: fileId,
		class: pdfObjectClass.text,
		x: 0,
		y: 0,
		text:"",
		Icon:TextFields,
		template: <PdfText fileId={fileId} pdfTextInit={pdfTextInitData} />
	}
};

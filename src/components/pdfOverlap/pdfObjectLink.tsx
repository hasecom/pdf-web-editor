import { PdfText } from "./pdfObjectTemplate";
import { pdfObjectClass, pdfTextInitData, pdfTextLinkType } from "@/constant/pdfObjectConstant";
import TextFields from '@mui/icons-material/TextFields';


export const pdf_text_link = (): pdfTextLinkType => {
	const fileId = Date.now();
	return {
		...pdfTextInitData,
		id: fileId,
		class: pdfObjectClass.text,
		Icon: TextFields,
		template: <PdfText fileId={fileId} pdfTextInit={pdfTextInitData} />
	};
};

import { TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import { usePdfObjectContext } from "@/provider/pdfObjectProvider"
import { useEffect, useState } from "react"
type PdfTextProps = {
	fileId:number
}
export const PdfText:NextPage<PdfTextProps> = ({fileId}) => {
	const {pdfObject,setPdfObject} = usePdfObjectContext();
  
	const targetObject = pdfObject.find((obj) => obj.id === fileId);
	if (!targetObject) {
		return null;
	}
	const [text, setText] = useState(targetObject?.text || "");
	useEffect(() => {
	  if (targetObject) {
		setText(targetObject.text);
	  }
	}, [targetObject]);
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		// const newText = e.target.value;
		// setPdfObject((prevPdfObject) =>
		//   prevPdfObject.map((obj) =>
		// 	obj.id === fileId ? { ...obj, text: newText } : obj
		//   )
		// );
	  };
	return (
		<>
		<TextField type="text" value="a"  onChange={handleTextChange} />
			{/* <TextField
				sx={{
					position: 'absolute',
					top: `30px`,
					left: `30px`,
					color: 'black',
					fontSize: 30,
					zIndex: 30
				}}
				variant="standard"
				value={text}
				onChange={handleTextChange}
			/> */}
		</>
	)
}
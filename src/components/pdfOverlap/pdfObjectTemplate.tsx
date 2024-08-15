import { TextField } from "@mui/material"
import { NextPage } from "next"
import { usePdfObjectContext } from "@/provider/pdfObjectProvider"
import { useEffect, useState } from "react"
import PdfTextContextMenu from "../menu/pdfTextContextMenu"
import { pdfTextLinkInitType } from "@/constant/pdfObjectConstant"
type PdfTextProps = {
	fileId: number,
	pdfTextInit:pdfTextLinkInitType
}
export const PdfText: NextPage<PdfTextProps> = ({ fileId,pdfTextInit }) => {
	const { pdfObject, setPdfObject } = usePdfObjectContext();
	const targetObject = pdfObject.find((obj) => obj.id === fileId);
	if (!targetObject) return null;
	const [text, setText] = useState(targetObject?.text || "");
	useEffect(() => {
		if (targetObject) {
			setText(targetObject.text);
		}
	}, [targetObject]);
	/*
	#コンテキストメニュー
	*/
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setAnchorEl(e.currentTarget);
	};
	/*
	#テキスト入力のハンドル
	*/
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		const newText = e.target.value;
		setPdfObject((prevPdfObject) =>
			prevPdfObject.map((obj) =>
				obj.id === fileId ? { ...obj, text: newText } : obj
			)
		);
	};
	return (
		<>
			<TextField
				sx={{
					position: 'absolute',
					top: pdfTextInit.y,
					left: pdfTextInit.x,
					zIndex: 30,
					width:'max-content'
				}}
				InputProps={{
					style: {
						color: 'black',
						fontSize: pdfTextInit.fontSize,
						fontWeight:pdfTextInit.fontWeight,
						width:'max-content'
					}
				}}
				onContextMenu={handleContextMenu}
				variant="standard"
				value={text}
				placeholder="Enter text"
				onChange={handleTextChange}
				fullWidth
			/>
			<PdfTextContextMenu anchorEl={anchorEl} handleClose={handleClose} />
		</>
	)
}
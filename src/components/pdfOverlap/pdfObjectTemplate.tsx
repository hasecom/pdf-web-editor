import { Box, TextField } from "@mui/material"
import { NextPage } from "next"
import { usePdfObjectContext } from "@/provider/pdfObjectProvider"
import { useEffect, useRef, useState } from "react"
import PdfTextContextMenu from "../menu/pdfTextContextMenu"
import { pdfTextLinkInitType } from "@/constant/pdfObjectConstant"
type PdfTextProps = {
	fileId: number,
	pdfTextInit: pdfTextLinkInitType
}
export const PdfText: NextPage<PdfTextProps> = ({ fileId, pdfTextInit }) => {
	const { pdfObject, setPdfObject,selectedPdfObjectId,addSelectedPdfObjectId } = usePdfObjectContext();
	const targetObject = pdfObject.find((obj) => obj.id === fileId);
	if (!targetObject) return null;
	const [text, setText] = useState(targetObject?.text || "");
	const textRef = useRef<HTMLDivElement | null>(null);
	const [inputWidth, setInputWidth] = useState(30);
	useEffect(() => {
		// canvasを使ってテキストの幅を計算する
		const calculateTextWidth = (text: string) => {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			if (context && textRef.current) {
				const style = getComputedStyle(textRef.current);
				context.font = `${style.fontSize} ${style.fontFamily}`;
				return context.measureText(text).width;
			}
			return 30; // 初期の最小幅
		};

		const width = calculateTextWidth(text);
		setInputWidth(width + 15); // 余白を加える
	}, [text]);
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
		<Box sx={{width:'100x'}}>
			<TextField
				sx={{
					position: 'absolute',
					zIndex: 30,
					width: `${inputWidth}px`,
					minWidth:'80px',
					border: fileId === selectedPdfObjectId ? '3px dashed blue' : '',
				}}
				InputProps={{
					style: {
						color: 'black',
				  	fontSize: pdfTextInit.fontSize,
						fontWeight: pdfTextInit.fontWeight,
						width: `${inputWidth}px`,
						minWidth:'80px'
					}
				}}
				onContextMenu={handleContextMenu}
				variant="standard"
				value={text}
				placeholder="Enter text"
				onChange={handleTextChange}
				onMouseDown={() =>{addSelectedPdfObjectId(fileId)}}
				fullWidth
			/>
			<PdfTextContextMenu anchorEl={anchorEl} handleClose={handleClose} />
			<Box ref={textRef} style={{ visibility: 'hidden', whiteSpace: 'nowrap', position: 'absolute' }}>
				{text}
			</Box>
		</Box>
	)
}
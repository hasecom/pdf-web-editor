'use client'
import React,{ useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button } from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { usePdfControllerContext } from '@/provider/pdfControllerProvider';
import { usePdfLayerContext } from '@/provider/pdfLayerProvider';
import PdfOverlapView from '../pdfOverlap/pdfOverlapView';
import { PDFDocument, rgb } from 'pdf-lib'; /* XXX */
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import { pdf_text_link } from '../pdfOverlap/pdfObjectLink';
import usePdf from '@/hooks/usePdfObject';
import useCanvasSize from '@/hooks/useCanvasSize';

const PdfViewer = () => {
	const { addLayerItem } = usePdfLayerContext();
	const { pageNumber, scale, handlePageLength } = usePdfControllerContext();
	const { pdfObject, addPdfObject } = usePdfObjectContext();
	const { pdfJsObject } = usePdf();
	
	const [url, setUrl] = useState<string>("/uploads/tes2.pdf");
	const [downloadUrl, setDownloadUrl] = useState<string>("");

	const { canvasSize,reacquireCanvasSize,canvasRef } = useCanvasSize();

	useEffect(() => {
		if (pdfJsObject == null) return;
		handlePageLength(pdfJsObject.numPages);
	}, [pdfJsObject]);
	const handleLoadSuccess = (page: any) => {
		if (!canvasRef.current) return;
		reacquireCanvasSize({width:canvasRef.current.clientWidth,height:canvasRef.current.clientHeight});
  };

	useEffect(() => {
		if (pdfJsObject == null) return;
		handlePageLength(pdfJsObject.numPages);
	}, [pdfJsObject]);

	useEffect(() => {
		const loadAndEditPdf = async () => {
			// const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
			// const pdfDoc = await PDFDocument.load(existingPdfBytes);
			// const pages = pdfDoc.getPages();
			// const firstPage = pages[0];

			// // ページの下部にテキストを描画
			// firstPage.drawText('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {
			// 	x: 50,
			// 	y: height - 50,
			// 	size: 30,
			// 	color: rgb(0, 0, 0),
			// });
			// const pdfBytes = await pdfDoc.save();
			// const blob = new Blob([pdfBytes], { type: 'application/pdf' });
			// const editedUrl = URL.createObjectURL(blob);

			// setDownloadUrl(editedUrl)
		};

		loadAndEditPdf();
	}, [url]);
	const aab = () => {
		console.log('Button clicked');
		addPdfObject(pdf_text_link);

	};
	return (

		<Box sx={{
			position: 'relative',
			width: '100%',
			height: '100%',
			overflow: 'auto',
		}}>
			<PdfController />
			<Box sx={{
				padding: 2,
				background: "#666666"
			}}>
				<Document file={url}>
					<Page pageNumber={pageNumber} scale={scale} canvasRef={canvasRef}   onLoadSuccess={handleLoadSuccess}>
						<PdfOverlapView canvasSize={canvasSize} />
					</Page>
				</Document>
			</Box>

			<Button variant="contained" color="primary" href={downloadUrl} download="edited.pdf">
				Download Edited PDF
			</Button>
			<Button variant="contained" color="primary" onClick={aab}>
				aaaasssssssssssssssssssssss
			</Button>

		</Box>

	);
}

export default PdfViewer;

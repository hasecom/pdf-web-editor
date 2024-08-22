'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button } from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { usePdfControllerContext } from '@/provider/pdfControllerProvider';
import PdfOverlapView from '../pdfOverlap/pdfOverlapView';
import { PDFDocument, rgb } from 'pdf-lib'; /* XXX */
import usePdf from '@/hooks/usePdfObject';
import useCanvasSize from '@/hooks/useCanvasSize';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
const PdfViewer = () => {
	const { pageNumber, scale, handlePageLength } = usePdfControllerContext();
	const { pdfJsObject } = usePdf();
	const { pdfObject,objectSettingStatus} = usePdfObjectContext();
	const [url, setUrl] = useState<string>("/uploads/tes2.pdf");
	const [downloadUrl, setDownloadUrl] = useState<string>("");

	const { canvasSize, reacquireCanvasSize, canvasRef } = useCanvasSize();

	useEffect(() => {
		if (pdfJsObject == null) return;
		handlePageLength(pdfJsObject.numPages);
	}, [pdfJsObject]);
	const handleLoadSuccess = (page: any) => {
		if (!canvasRef.current) return;
		reacquireCanvasSize({ width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight });
	};

	useEffect(() => {
		if (pdfJsObject == null) return;
		handlePageLength(pdfJsObject.numPages);
	}, [pdfJsObject]);

	const handleDownload = async () => {
		console.log(objectSettingStatus)
		// PDF を編集する
		const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];

		pdfObject.forEach(obj => {
      if (obj.class === 'text') {
				const style = objectSettingStatus.find(style => style.fieldId === obj.id);
        firstPage.drawText(obj.text, {
          x: obj.x,
          y: obj.y,
					size: style?.fontSize,
					color: style?.fontColor /* TODO: */
					? rgb(
							parseInt(style.fontColor.slice(1, 3), 16) / 255,
							parseInt(style.fontColor.slice(3, 5), 16) / 255,
							parseInt(style.fontColor.slice(5, 7), 16) / 255
						)
					: rgb(0, 0, 0),
        });
      }
    });

		const pdfBytes = await pdfDoc.save();
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const editedUrl = URL.createObjectURL(blob);

		// 動的にダウンロード URL を設定
		setDownloadUrl(editedUrl);
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
				background: "#666666",
				height: canvasSize.height + 100,
				width: canvasSize.width + 100,
				display: 'flex',
				justifyContent: 'center',

			}}>
				<Document file={url}>
					<Page pageNumber={pageNumber} scale={scale} canvasRef={canvasRef} onLoadSuccess={handleLoadSuccess}>
						<PdfOverlapView canvasSize={canvasSize} />
					</Page>
				</Document>
			</Box>

			<Button
				variant="contained"
				color="primary"
				onClick={handleDownload}
				href={downloadUrl}
				download="edited.pdf"
			>
				Download Edited PDF
			</Button>
		</Box>

	);
}

export default PdfViewer;

'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button } from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { usePdfControllerContext } from '@/provider/pdfControllerProvider';
import PdfOverlapView from '../pdfOverlap/pdfOverlapView';
import usePdf from '@/hooks/usePdfObject';
import useCanvasSize from '@/hooks/useCanvasSize';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import mergePdfObject from './mergePdfObject';
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
		const editedUrl  = await mergePdfObject({url,pdfObject,objectSettingStatus,canvasSize});
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
			<Button
				variant="contained"
				color="primary"
				onClick={handleDownload}
				href={downloadUrl}
				download="edited.pdf"
			>
				Download Edited PDF
			</Button>
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
		</Box>

	);
}

export default PdfViewer;

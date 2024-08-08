'use client'
import { pdfjs, Document, Page } from 'react-pdf';
import { Box, Button} from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { usePdfControllerContext } from '@/provider/pdfControllerProvider';
import { useEffect, useState } from 'react';
import { usePdfLayerContext } from '@/provider/pdfLayerProvider';
import PdfOverlapView from '../pdfOverlap/pdfOverlapView';
import { PDFDocument, rgb } from 'pdf-lib'; /* XXX */
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import { pdf_text_link } from '../pdfOverlap/pdfObjectLink';
import React from 'react';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/legacy/build/pdf.worker.mjs',
	import.meta.url,
).toString();

const PdfViewer = () => {
	const { addLayerItem } = usePdfLayerContext();
	const { pageNumber, scale, handlePageLength } = usePdfControllerContext();
	const { pdfObject, addPdfObject } = usePdfObjectContext();
	const [url, setUrl] = useState<string>("/uploads/tes2.pdf");
	const [downloadUrl, setDownloadUrl] = useState<string>("");
	useEffect(() => {
		pdfjs.getDocument(url).promise.then(pdf => {
			handlePageLength(pdf.numPages);
			addLayerItem('Layer1:upload.pdf');
		});
	}, []);

	useEffect(() => {
		const loadAndEditPdf = async () => {
			const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
			const pdfDoc = await PDFDocument.load(existingPdfBytes);
			const pages = pdfDoc.getPages();
			const firstPage = pages[0];
			const { width, height } = firstPage.getSize();

			// ページの下部にテキストを描画
			firstPage.drawText('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {
				x: 50,
				y: height - 50,
				size: 30,
				color: rgb(0, 0, 0),
			});
			const pdfBytes = await pdfDoc.save();
			const blob = new Blob([pdfBytes], { type: 'application/pdf' });
			const editedUrl = URL.createObjectURL(blob);

			setDownloadUrl(editedUrl)
		};

		loadAndEditPdf();
	}, [url]);
	const aab = () => {
		console.log('Button clicked');
		addPdfObject(pdf_text_link);
		console.log(pdfObject);
		console.log(pdfObject.length);
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
					<Page pageNumber={pageNumber} scale={scale} >
						
					</Page>
				</Document>
			</Box>
			
			<Button variant="contained" color="primary" href={downloadUrl} download="edited.pdf">
				Download Edited PDF
			</Button>
			<Button variant="contained" color="primary" onClick={aab}>
				aaaasssssssssssssssssssssss
			</Button>
			<PdfOverlapView />
		</Box>

	);
}

export default PdfViewer;

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Box, Button, Slider, Typography } from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/legacy/build/pdf.worker.mjs',
	import.meta.url,
).toString();

const PdfViewer = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.0);

	const handleZoomChange = (event: Event, newValue: number | number[]) => {
		setScale(newValue as number);
	};

	const handlePrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
	const handleNextPage = () => setPageNumber(prev => prev + 1);

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
				<Document file="/uploads/test.pdf">
					<Page pageNumber={pageNumber} scale={scale} />
				</Document>
			</Box>
		</Box>
	);
}

export default PdfViewer;

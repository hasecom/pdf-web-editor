'use client'
import { pdfjs, Document, Page } from 'react-pdf';
import { Box } from '@mui/material';
import PdfController from './pdfController';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { usePdfControllerContext } from '@/provider/pdfControllerProvider';
import { useEffect, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/legacy/build/pdf.worker.mjs',
	import.meta.url,
).toString();

const PdfViewer = () => {
	const { pageNumber,scale,handlePageLength } = usePdfControllerContext();
	const [url,setUrl] = useState<string>("/uploads/tes2.pdf");
	useEffect(()=>{
        pdfjs.getDocument(url).promise.then(pdf => {
			console.log(pdf);
            handlePageLength(pdf.numPages);
        });
	},[]);
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
					<Page pageNumber={pageNumber} scale={scale} />
				</Document>
			</Box>
		</Box>
	);
}

export default PdfViewer;

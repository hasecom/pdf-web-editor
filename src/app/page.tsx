'use client'
import { Grid, Typography } from "@mui/material";
import FileUpload from "@/components/pdf/fileUploader";
import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	'pdfjs-dist/legacy/build/pdf.worker.mjs',
// 	import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
const Home = () => {
	useEffect(()=>{
		
	},[])
	return (
		<main>
			<GridParent />
		</main>
	);
}
const GridParent = () => {
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<Typography variant="h6">
					<FileUpload onUpload={(url) => setFileUrl(url)} />
					<Document file="/uploads/test.pdf">
						<Page pageNumber={1} />
					</Document>
				</Typography>
			</Grid>
			<Grid item xs={4} container direction="column" spacing={2}>
				<Grid item>
					<Typography variant="h6">Y</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h6">Z</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default Home;
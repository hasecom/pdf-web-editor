'use client'
import { Grid, Typography } from "@mui/material";
import { PdfControllerProvider } from "@/provider/pdfControllerProvider";
import { PdfObjectProvider } from "@/provider/pdfObjectProvider";
import { PdfLayerProvider } from "@/provider/pdfLayerProvider";
import FileUpload from "@/components/pdf/fileUploader";
import { useState } from "react";
import PdfViewer from "@/components/pdf/pdfViewer";
import PdfLayer from "@/components/layer/pdfLayer";
const Home = () => {
	return (
		<PdfControllerProvider>
			<PdfObjectProvider>
				<PdfLayerProvider>
					<main>
						<GridParent />
					</main>
				</PdfLayerProvider>
			</PdfObjectProvider>
		</PdfControllerProvider>
	);
}
const GridParent = () => {
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={8}>
				<FileUpload onUpload={(url) => setFileUrl(url)} />
				<PdfViewer />
			</Grid>
			<Grid item xs={12} md={4} container direction="column" spacing={2}>
				<Grid item>
					<PdfLayer />
				</Grid>
				<Grid item>
					<Typography variant="h6">Z</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default Home;
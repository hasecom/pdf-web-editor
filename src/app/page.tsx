'use client'
import { Grid, Typography } from "@mui/material";
import FileUpload from "@/components/pdf/fileUploader";
import { useState } from "react";
import PdfViewer from "@/components/pdf/pdfViewer";

const Home = () => {
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
			<Grid item xs={12} md={8}>
					<FileUpload onUpload={(url) => setFileUrl(url)} />
					<PdfViewer />
			</Grid>
			<Grid item xs={12} md={4} container direction="column" spacing={2}>
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
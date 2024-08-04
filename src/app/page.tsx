'use client'
import { Grid, Typography } from "@mui/material";
import FileUpload from "@/components/pdf/fileUploader";
import { useState } from "react";
import { Document, Page } from 'react-pdf';

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
			<Grid item xs={8}>
				<Typography variant="h6">
					<FileUpload onUpload={(url) => setFileUrl(url)} />
					<Document file="/uploads/aaa.pdf">
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
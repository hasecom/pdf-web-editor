import { Box, Divider, IconButton, Typography } from "@mui/material";
import { usePdfContext } from "@/provider/pdfProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const PdfController = () => {
	const { scale, pageNumber, pageLength, handlePrevPage, handleNextPage, handleZoomIn, handleZoomOut } = usePdfContext();

	/* ページ移動 */
	const PrevNext = () => (
		<>
			<IconButton sx={{ color: 'white' }} onClick={handlePrevPage} >
				<ArrowBackIcon />
			</IconButton>
			<Typography>{pageNumber} / {pageLength}</Typography>
			<IconButton sx={{ color: 'white' }} onClick={handleNextPage}>
				<ArrowForwardIcon />
			</IconButton>
		</>
	)
	/* ページズームアウト */
	const ZoomInOut = () => (
		<>
			<IconButton sx={{ color: 'white' }} onClick={handleZoomOut} >
				<RemoveIcon />
			</IconButton>
			<Typography>{Math.round(scale * 100)}%</Typography>
			<IconButton sx={{ color: 'white' }} onClick={handleZoomIn} >
				<AddIcon />
			</IconButton>
		</>
	)
	return (
		<Box sx={{ backgroundColor: '#333639' }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, color: 'white' }}>
				<PrevNext />
				<Divider aria-hidden="true" orientation="vertical" variant="middle" flexItem color="white" />
				<ZoomInOut />
			</Box>
		</Box>
	)
}
export default PdfController;
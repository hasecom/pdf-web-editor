import { Box, Button, Typography } from "@mui/material";

const PdfController = () => { 
	return (
		<Box sx={{backgroundColor:'#333639'}}>
		<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
			<Button onClick={handlePrevPage} variant="contained">前のページ</Button>
			<Button onClick={handleNextPage} variant="contained">次のページ</Button>
		</Box>
		
		<Box>
			<Typography>ズーム:</Typography>
			<Slider
				value={scale}
				onChange={handleZoomChange}
				min={0.5}
				max={3}
				step={0.1}
				aria-labelledby="zoom-slider"
			/>
		</Box>
		</Box>
	)
}
export default PdfController;
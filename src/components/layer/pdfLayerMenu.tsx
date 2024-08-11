import AddIcon from '@mui/icons-material/Add';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import LayerMenu from '../menu/layerMenu';
const PdfLayerMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'left'
				}}
			>

				 <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}

						id="demo-positioned-button"
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
        >レイヤーを追加する</Button>

			</Box>
			<LayerMenu handleClose={handleClose} anchorEl={anchorEl}  />
		</>
	)
}
export default PdfLayerMenu;
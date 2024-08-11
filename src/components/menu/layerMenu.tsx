import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { NextPage } from 'next';
import { Menu } from '@mui/material';

type pdfLayerMenuProps = {
	anchorEl:null | HTMLElement,
	handleClose:()=>void
}

interface MenuWrapProps {
	children: React.ReactNode;
	layerMenuProps:pdfLayerMenuProps
}

const MenuWrap: NextPage<MenuWrapProps> = ({ children,layerMenuProps }) => {
	const open = Boolean(layerMenuProps.anchorEl);
	return (
		<Paper sx={{maxWidth: '100%' }} >
			  <Menu
				
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={layerMenuProps.anchorEl}
        open={open}
        onClose={layerMenuProps.handleClose}
				anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
			<MenuList>{children}</MenuList>
			</Menu>
		</Paper>
	);
};
const MenuChild = () => {
	return (
		<>
			<MenuItem>
				<ListItemIcon>
					<TextFieldsIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Text</ListItemText>
				{/* <Typography variant="body2" color="text.secondary">
					⌘X
				</Typography> */}
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<PictureAsPdfIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>PDF</ListItemText>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<ContentPaste fontSize="small" />
				</ListItemIcon>
				<ListItemText>Paste</ListItemText>
				<Typography variant="body2" color="text.secondary">
					⌘V
				</Typography>
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<Cloud fontSize="small" />
				</ListItemIcon>
				<ListItemText>Web Clipboard</ListItemText>
			</MenuItem>
		</>
	)
}


const LayerMenu:NextPage<pdfLayerMenuProps> = (props) => {
	return (
		<>
			<MenuWrap layerMenuProps={props}>
				<MenuChild />
			</MenuWrap>
		</>
	)
}
export default LayerMenu;
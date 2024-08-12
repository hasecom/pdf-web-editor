import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import { pdf_text_link } from '../pdfOverlap/pdfObjectLink';
import { NextPage } from 'next';
import { Menu } from '@mui/material';

type pdfLayerMenuProps = {
	anchorEl: null | HTMLElement,
	handleClose: () => void
}

interface MenuWrapProps {
	children: React.ReactNode;
	layerMenuProps: pdfLayerMenuProps
}

const MenuWrap: NextPage<MenuWrapProps> = ({ children, layerMenuProps }) => {
	const open = Boolean(layerMenuProps.anchorEl);
	return (
		<Paper sx={{ maxWidth: '100%' }} >
			<Menu
				id="layer-menu"
				aria-labelledby="layer-menu-button"
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
const MenuChild:NextPage<MenuWrapProps>  = ({layerMenuProps}) => {
	const {addPdfObject} = usePdfObjectContext();
	const ClickAddText = () => {
		console.log("clicked")
		addPdfObject(pdf_text_link);
		layerMenuProps.handleClose();
	}
	const ClickAddPDF = () => {

	}
	return (
		<>
			<MenuItem>
				<ListItemIcon>
					<TextFieldsIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText onClick={ClickAddText}>Text</ListItemText>
				{/* <Typography variant="body2" color="text.secondary">
					⌘X
				</Typography> */}
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<PictureAsPdfIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText onClick={ClickAddPDF}>PDF</ListItemText>
			</MenuItem>
		</>
	)
}

const LayerMenu: NextPage<pdfLayerMenuProps> = (props) => {
	return (
		<>
			<MenuWrap layerMenuProps={props}>
				<MenuChild layerMenuProps={props} children={undefined} />
			</MenuWrap>
		</>
	)
}
export default LayerMenu;
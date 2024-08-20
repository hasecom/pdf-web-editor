import React, { useEffect, useState } from 'react';
import { ToggleButton, Popover } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { SketchPicker } from 'react-color';
import { edtitorProps } from '@/types/common';
import { NextPage } from 'next';

const ColorPickerButton: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedColor, setSelectedColor] = useState(currentObject ? currentObject.fontColor : '#000000');
	useEffect(() => {
		setObjectSettingStatus(prevState =>
			prevState.map(item =>
				item.fieldId === selectedPdfObjectId
					? { ...item, fontColor: selectedColor }
					: item
			)
		);
	}, [selectedColor])
	useEffect(()=>{
		setSelectedColor(currentObject ? currentObject.fontColor : '#000000');
	},[selectedPdfObjectId])
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleColorChange = (color: { hex: React.SetStateAction<string>; }) => {
		setSelectedColor(color.hex);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'color-popover' : undefined;

	return (
		<div>
			<ToggleButton value="color" aria-label="color" onClick={handleClick}
				sx={{
					color: currentObject ? currentObject.fontColor : '#000000'
				}}
			>
				<FormatColorTextIcon style={{ color:selectedColor }} />
				<ArrowDropDownIcon />
			</ToggleButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<SketchPicker color={selectedColor} onChange={handleColorChange} />
			</Popover>
		</div>
	);
}

export default ColorPickerButton;
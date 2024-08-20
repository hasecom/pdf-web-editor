import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import { Typography } from '@mui/material';
import { edtitorProps } from '@/types/common';
import { NextPage } from 'next';

const FontSizeController: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {
	const [fontSize, setFontSize] = useState(currentObject ? currentObject.fontSize : 16);
	useEffect(() => {
		setObjectSettingStatus(prevState =>
			prevState.map(item =>
				item.fieldId === selectedPdfObjectId
					? { ...item, fontSize: fontSize }
					: item
			)
		);
	}, [fontSize])
	useEffect(() => {
		setFontSize(currentObject ? currentObject.fontSize : 16);
	}, [selectedPdfObjectId])

	const handleIncrease = () => {
		setFontSize(prevSize => prevSize + 1);
	};

	const handleDecrease = () => {
		setFontSize(prevSize => prevSize > 1 ? prevSize - 1 : prevSize);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSize = parseInt(event.target.value, 10);
		if (!isNaN(newSize) && (newSize > 0 && newSize <=60)) {
			setFontSize(newSize);
		}
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="center" gap={2} >
			<IconButton onClick={handleDecrease} aria-label="decrease font size"
				sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px', color: 'rgb(34, 34, 34)' }}>
				<TextDecreaseIcon />
			</IconButton>
			<Input
				value={fontSize}
				onChange={handleInputChange}
				inputProps={{
					'aria-label': 'font size',
					type: 'number',
					min: 1,
				}}
				style={{ width: 50, textAlign: 'center' }}
			/>
			<Typography variant="body2" sx={{ color: 'rgb(34, 34, 34)' }}>px</Typography>
			<IconButton onClick={handleIncrease} aria-label="increase font size"
				sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px', color: 'rgb(34, 34, 34)' }}>
				<TextIncreaseIcon />
			</IconButton>
		</Box>
	);
}

export default FontSizeController;
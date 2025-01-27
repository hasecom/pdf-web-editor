'use client'
import React, { useState } from 'react';
import {
	useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';

import { NextPage } from 'next';
import { pdfWrapType } from '@/constant/pdfObjectConstant';

type SortableItemProps = {
	item: pdfWrapType
	selectedPdfObjectId: number,
	addSelectedPdfObjectId: (elementId: number) => void
}
const SortableItem: NextPage<SortableItemProps> = ({ item, selectedPdfObjectId, addSelectedPdfObjectId }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: item.id });

	const maxLength = 15;
	const trimmedText = item.text.length > maxLength
		? `${item.text.substring(0, maxLength)}...`
		: item.text;

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		padding: '16px',
		border: '1px solid #ccc',
		marginBottom: '8px',
		backgroundColor: item.id === selectedPdfObjectId ? 'rgb(220,220,220)' : 'white',
		cursor: 'move',
	};

	return (
		<Box ref={setNodeRef} style={style} {...attributes} {...listeners} onMouseDown={() => { addSelectedPdfObjectId(item.id) }} display="flex"
			alignItems="center">
			{item.Icon &&
				<item.Icon />
			}
			<Typography sx={{ paddingX: 2 }}>
				{trimmedText}
			</Typography>
		</Box>
	);
};
export default SortableItem;
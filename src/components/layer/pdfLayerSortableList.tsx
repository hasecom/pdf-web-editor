'use client'
import React, { useState } from 'react';
import {
	DndContext,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './pdfLayerSortableItem';
import { Box } from '@mui/material';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';

const SortableList = () => {
	const { pdfObject, setPdfObject,selectedPdfObjectId,addSelectedPdfObjectId,objectSettingStatus } = usePdfObjectContext();

	const handleDragEnd = (event: any) => {
		console.log(objectSettingStatus)
		const { active, over } = event;
		if (active.id !== over.id) {
			const activeId = active.id;
			const overId = over.id;

			const oldIndex = pdfObject.findIndex(item => item.id === activeId);
			const newIndex = pdfObject.findIndex(item => item.id === overId);

			if (oldIndex === -1 || newIndex === -1) {
				console.error('Invalid drag and drop indices');
				return;
			}
			setPdfObject(prev => {
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<Box style={{ backgroundColor: '#333639', padding: '20px' }}>
				<SortableContext items={pdfObject} strategy={verticalListSortingStrategy}>
					{pdfObject.map((item) => (
						<SortableItem key={item.id} item={item} selectedPdfObjectId={selectedPdfObjectId} addSelectedPdfObjectId={addSelectedPdfObjectId} />
					))}
				</SortableContext>
			</Box>
		</DndContext>
	);
};
export default SortableList;

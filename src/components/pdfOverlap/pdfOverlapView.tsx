'use client'
import { Box, Typography } from "@mui/material";
import { useSortable } from '@dnd-kit/sortable';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import {  useState } from "react";

import { CSS } from '@dnd-kit/utilities';
import { NextPage } from "next";
interface DraggableProps {
	id: string;
	children: React.ReactNode;
}
const DroppableArea = ({ id,canvasSize }: { id: string,canvasSize:{width:number,height:number}}) => {
	const { setNodeRef, isOver } = useDroppable({ id });

	const style: React.CSSProperties = {
		top: 0,
		width: canvasSize.width,
		height: canvasSize.height,
		border: '2px dashed black',
		position: 'absolute',
		zIndex: 1000
	};

	return <div ref={setNodeRef} style={style} />;
};
type PdfOverlapViewProps = {
	canvasSize:{width:number,height:number}
}
const PdfOverlapView:NextPage<PdfOverlapViewProps> = ({canvasSize}) => {
	const [items, setItems] = useState([
		{ id: '0', x: 30, y: 30 },
		{ id: '1', x: 100, y: 100 },
	]);
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over) {
			setItems((items) =>
				items.map((item) =>
					item.id === active.id
						? {
							...item,
							x: event.delta.x + item.x,
							y: event.delta.y + item.y,
						}
						: item
				)
			);
		}
	};

	return (
		<Box sx={{
			width: canvasSize.width,
			height: canvasSize.height,
		}}>
			<DndContext onDragEnd={handleDragEnd}>
				<DroppableArea id="droppable" canvasSize={canvasSize} />
				{/* {pdfObject.map((item: any, index: any) => ( */}
				{items.map(item => (
					<DraggableItem key={item.id} id={item.id} style={{ left: item.x, top: item.y }} />
				))}
			</DndContext>

		</Box>
	)
}
export default PdfOverlapView;

const DraggableItem = ({ id, style }: { id: string; style: React.CSSProperties }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	});

	const draggableStyle: React.CSSProperties = {
		cursor: 'move',
		border: '1px solid black',
		width: '50px',
		height: '50px',
		position: 'absolute',
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		zIndex: 1000,
		...style,
	};

	return (
		<div
			ref={setNodeRef}
			style={draggableStyle}
			{...listeners}
			{...attributes}
		>
			{id}
		</div>
	);
};
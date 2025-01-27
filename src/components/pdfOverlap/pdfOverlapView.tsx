'use client'
import { Box } from "@mui/material";
import { DndContext, useDraggable, useDroppable, DragEndEvent, useSensors, useSensor, PointerSensor, KeyboardSensor, DragStartEvent, MouseSensor } from '@dnd-kit/core';
import { usePdfObjectContext } from "@/provider/pdfObjectProvider";
import { pdfTextLinkType, pdfWrapType } from "@/constant/pdfObjectConstant";
import { NextPage } from "next";

const DroppableArea = ({ id, canvasSize }: { id: string, canvasSize: { width: number, height: number } }) => {
	const { setNodeRef, isOver } = useDroppable({ id });

	const style: React.CSSProperties = {
		top: 0,
		width: canvasSize.width,
		height: canvasSize.height,
		border: '2px dashed black',
		position: 'absolute',
		zIndex: 1000
	};

	return <Box ref={setNodeRef} style={style} />;
};
type PdfOverlapViewProps = {
	canvasSize: { width: number, height: number }
}
const PdfOverlapView: NextPage<PdfOverlapViewProps> = ({ canvasSize }) => {
	const { pdfObject, setPdfObject } = usePdfObjectContext();

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10
		},
	});

	const sensors = useSensors(
		mouseSensor,
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over) {
			setPdfObject((prevState) =>
				prevState.map((item) =>
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
			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}>
				<DroppableArea id="droppable" canvasSize={canvasSize} />
				{pdfObject.map((item: pdfWrapType, index: any) => (
					<DraggableItem  key={item.id} item={item} style={{ left: item.x, top: item.y }} />
				))}
			</DndContext>
		</Box>
	)
}
export default PdfOverlapView;

const DraggableItem = ({ item, style }: { item: pdfTextLinkType, style: React.CSSProperties }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: item.id
	});

	const draggableStyle: React.CSSProperties = {
		cursor: 'move',
		width:'100px',
		height: '50px',
		position: 'absolute',
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		zIndex: 1000,
		...style,
	};

	return (
		<Box
			ref={setNodeRef}
			style={draggableStyle}
			{...listeners}
			{...attributes}
		>
			{item.template}
		</Box>
	);
};
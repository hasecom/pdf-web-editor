'use client'
import { Box } from "@mui/material";
import { usePdfObjectContext } from "@/provider/pdfObjectProvider";
import { useSortable } from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { useState } from "react";

interface DraggableProps {
	id: string;
	children: React.ReactNode;
}

const PdfOverlapView = () => {
	const { pdfObject } = usePdfObjectContext();
  const [items, setItems] = useState([
    { id: '0', x: 30, y: 30 },
    { id: '1', x: 100, y: 100 },
  ]);
	
  const handleDragEnd = (event: any) => {
    const { active, delta } = event;

    // 要素の位置を更新
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === active.id
          ? {
              ...item,
              x: item.x + delta.x,
              y: item.y + delta.y,
            }
          : item
      )
    );
  };

	return (
		<> <Box sx={{ width: '100px', height: '100px', position: 'relative' }}>
		  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			{pdfObject.map((item: any, index: any) => (
				<DraggableItem key={index}  id={String(index)}>
					<item.template />
				</DraggableItem>
			))}
			</DndContext>
			</Box>
		</>
	)
}
export default PdfOverlapView;

interface DraggableItemProps extends DraggableProps {
  x: number;
  y: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id,x, y, children }) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

	const style: React.CSSProperties = {
    transform: `translate3d(${x + (transform?.x ?? 0)}px, ${y + (transform?.y ?? 0)}px, 0)`,
    cursor: 'move',
    position: 'absolute',
    zIndex: 1000,
  };


	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};

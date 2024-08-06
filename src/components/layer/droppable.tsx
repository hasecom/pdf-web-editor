import React, { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable
} from '@dnd-kit/core';

const DropZone = () => {
	const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });

  const style = {
    color: isOver ? 'green' : 'black',
  };

  return (
    <div ref={setNodeRef} style={style}>
      Drop here
    </div>
  );
};

export default DropZone;

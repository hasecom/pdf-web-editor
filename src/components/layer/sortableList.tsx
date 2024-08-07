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
import SortableItem from './sortableItem';
import { usePdfLayerContext } from '@/provider/pdfLayerProvider';
import { Box } from '@mui/material';

const SortableList = () => {
  const { layerItems, setLayerItems } = usePdfLayerContext();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 10 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLayerItems((layerItems) => {
        const oldIndex = layerItems.indexOf(active.id);
        const newIndex = layerItems.indexOf(over.id);
        return arrayMove(layerItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
			 <Box style={{ backgroundColor: '#333639', padding: '20px' }}>
      <SortableContext items={layerItems} strategy={verticalListSortingStrategy}>
        {layerItems.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
			</Box>
    </DndContext>
  );
};
export default SortableList;

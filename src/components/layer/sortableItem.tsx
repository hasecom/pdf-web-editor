'use client'
import React from 'react';
import {
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';

const SortableItem = ({ id }:any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    border: '1px solid #ccc',
    marginBottom: '8px',
    backgroundColor: 'white',
    cursor: 'move',
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      aa
    </Box>
  );
};
export default SortableItem;
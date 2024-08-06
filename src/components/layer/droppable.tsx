import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableBox from '@/components/layer/draggable';

const DropZone = () => {
  const [boxes, setBoxes] = useState([]);

//   const [{ isOver }, drop] = useDrop({
//     accept: ItemTypes.BOX,
//     drop: (item) => {
//       const newBox = { name: item.name };
//       setBoxes([...boxes, newBox]);
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

  return (
    <>test</>
    // <div
    //   ref={drop}
    //   style={{
    //     border: '1px solid black',
    //     minHeight: '10rem',
    //     padding: '1rem',
    //     backgroundColor: isOver ? 'lightyellow' : 'white',
    //   }}
    // >
    //   {boxes.map((box, index) => (
    //     <DraggableBox key={index} name={box.name} />
    //   ))}
    // </div>
  );
};

export default DropZone;

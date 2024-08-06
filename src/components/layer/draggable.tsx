import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const DraggableBox = ({ name }:any) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.BOX,
//     item: { name },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

  return (
    <>test</>
    // <div
    //   ref={drag}
    //   style={{
    //     opacity: isDragging ? 0.5 : 1,
    //     cursor: 'move',
    //     border: '1px dashed gray',
    //     backgroundColor: 'white',
    //     padding: '0.5rem',
    //     marginBottom: '0.5rem',
    //   }}
    // >
    //   {name}
    // </div>
    //https://qiita.com/shungiku/items/e395251d7ee3f3d220c1
  );
};

export default DraggableBox;

import DraggableBox from "./draggable";
import DropZone from "./droppable";
import {
  DndContext,
  useDraggable,
  useDroppable
} from '@dnd-kit/core';
const PdfLayer = () => {
	return (
		<>
			<DndContext>
				<DraggableBox />
			</DndContext>
		</>
	)
}
export default PdfLayer;

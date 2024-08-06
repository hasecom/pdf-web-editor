import DraggableBox from "./draggable";
import DropZone from "./droppable";

const PdfLayer = () => {
    return (
        <>
            <DraggableBox name="Box 1" />
            <DraggableBox name="Box 2" />
            <DropZone />
        </>
    )
}
export default PdfLayer;

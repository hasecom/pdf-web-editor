'use client'
import SortableList from '@/components/layer/pdfLayerSortableList';
import PdfLayerMenu from './pdfLayerMenu';
const PdfLayer = () => {
	return (
		<>
			<PdfLayerMenu />
			<SortableList />
		</>
	)
}
export default PdfLayer;

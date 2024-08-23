import { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import usePdf from './usePdfObject';

export interface CanvasSize {
	width: number;
	height: number;
}

const useCanvasSize = () => {
	const { url } = usePdf();

	const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const reacquireCanvasSize = ({ width: width, height: height }: CanvasSize): void => {
		setCanvasSize({ width: width, height: height });
	}

	useEffect(() => {
		if (canvasRef.current) {
			reacquireCanvasSize({width:canvasRef.current.clientWidth,height:canvasRef.current.clientHeight});
		}
	}, [canvasRef.current]);
	const fetchPdfAndSetSize = async () => {
		try {
			const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
			const pdfDoc = await PDFDocument.load(existingPdfBytes);
			const firstPage = pdfDoc.getPages()[0];
			const { width, height } = firstPage.getSize();
			reacquireCanvasSize({ width, height });
		} catch (error) {
			console.error('Error loading PDF document:', error);
		}
	};
	useEffect(() => {
		fetchPdfAndSetSize();
	}, [url]);

	return { canvasSize, reacquireCanvasSize,canvasRef };
};

export default useCanvasSize;

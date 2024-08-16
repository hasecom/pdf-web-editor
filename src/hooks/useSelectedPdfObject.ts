import { useState } from "react";

/**
 * 最後に選択したPDFオブジェクトのElementIdを管理します。
 *
 * @returns {{ selectedPdfObjectId: any; addSelectedPdfObjectId: (elementId: number) => void; }}
 */
const useSelectedPdfObject = () => {
	const [selectedPdfObjectId,setSelectedPdfObjectId] = useState<number>(0);
	const addSelectedPdfObjectId = (elementId:number):void => {
		setSelectedPdfObjectId(elementId);		
	}
	return {selectedPdfObjectId,addSelectedPdfObjectId}
}
export default useSelectedPdfObject;
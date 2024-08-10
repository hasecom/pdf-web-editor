import  { useState } from 'react';

const usePdfController = () => {
  /* PDFのズーム倍率を保持します。初期値は1.0(100%)としています。　*/
  const [scale, setScale] = useState<number>(1.0);
  /* PDFのズームインする関数です。最大スケールは3.0としています。 */
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(parseFloat((prevScale + 0.1).toFixed(2)), 3.0));
  };
  /* PDFのズームアウトする関数です。最小スケールは0.5としています。 */
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(parseFloat((prevScale - 0.1).toFixed(2)), 0.5));
  };
	return {scale,handleZoomIn,handleZoomOut};
};

export default usePdfController;
'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ContextType {
  pageNumber: number,
  scale: number,
  handlePrevPage: () => void,
  handleNextPage: () => void,
  pageLength: number,
  handlePageLength: (loadedPageLength: number) => void,
  handleZoomIn: () => void,
  handleZoomOut: () => void
}
type ProviderProps = {
  children: ReactNode;
};

const Context = createContext<ContextType | undefined>(undefined);

const PdfControllerProvider: React.FC<ProviderProps> = ({ children }) => {
  /* PDFの現在開いているページ数を保持します。データは存在する前提のため初期値は、1としています。 */
  const [pageNumber, setPageNumber] = useState(1);
  /* PDFの現在開いているページ数を保持します。 動的で未知数な値のため初期値は、0としています。 */
  const [pageLength, setPageLength] = useState(0);
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
  /* PDFのページを戻す関数です。　*/
  const handlePrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  /* PDFのページを送る関数です。　*/
  const handleNextPage = () => setPageNumber(prev => prev + 1);

  const handlePageLength = (loadedPageLength: number) => setPageLength(loadedPageLength);
  const contextValue: ContextType = {
    pageNumber: pageNumber,
    scale: scale,
    pageLength: pageLength,
    handlePrevPage: handlePrevPage,
    handleNextPage: handleNextPage,
    handlePageLength: handlePageLength,
    handleZoomIn: handleZoomIn,
    handleZoomOut: handleZoomOut
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const usePdfControllerContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { PdfControllerProvider, usePdfControllerContext };
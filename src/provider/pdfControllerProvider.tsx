'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';
import usePdfController from '@/hooks/usePdfController';
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
	/* スケール */
	const {scale,handleZoomIn,handleZoomOut} =  usePdfController();
  /* PDFの現在開いているページ数を保持します。データは存在する前提のため初期値は、1としています。 */
  const [pageNumber, setPageNumber] = useState(1);
  /* PDFの現在開いているページ数を保持します。 動的で未知数な値のため初期値は、0としています。 */
  const [pageLength, setPageLength] = useState(0);

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
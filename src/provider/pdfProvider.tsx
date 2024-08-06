import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ContextType {
	pageNumber:number,
    scale:number,
    handlePrevPage:()=>void,
    handleNextPage:()=>void,
    pageLength:number,
    handlePageLength:(loadedPageLength:number)=>void,
    handleZoomIn:()=>void,
    handleZoomOut:()=>void
}
type ProviderProps = {
  children: ReactNode;
};

const Context = createContext<ContextType | undefined>(undefined);
const PdfProvider: React.FC<ProviderProps> = ({ children }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLength,setPageLength] = useState(0);
	const [scale, setScale] = useState<number>(1.0);

    const handleZoomIn = () => {
      setScale(prevScale => Math.min(parseFloat((prevScale + 0.1).toFixed(2)), 3.0));
    };
    const handleZoomOut = () => {
      setScale(prevScale => Math.max(parseFloat((prevScale - 0.1).toFixed(2)), 0.5));
    };

	const handlePrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
	const handleNextPage = () => setPageNumber(prev => prev + 1);
    const handlePageLength = (loadedPageLength:number) => setPageLength(loadedPageLength);
	const contextValue: ContextType = {
		pageNumber:pageNumber,
        scale:scale,
        pageLength:pageLength,
        handlePrevPage:handlePrevPage,
        handleNextPage:handleNextPage,
        handlePageLength:handlePageLength,
        handleZoomIn:handleZoomIn,
        handleZoomOut:handleZoomOut
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const usePdfContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { PdfProvider, usePdfContext };
'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';
import usePdfObjectStatus from '@/hooks/usePdfObjectStatus';
import { pdfWrapType } from '@/components/pdfOverlap/pdfObjectLink';

interface CanvasSize {
  width: number;
  height: number;
}
type ProviderProps = {
  children: ReactNode;
};

interface ContextType{
  pdfObject:pdfWrapType[],
  addPdfObject:(pdfObjectItem:pdfWrapType)=>void,
  canvasSize:CanvasSize,
  setCanvasSize:React.Dispatch<React.SetStateAction<CanvasSize>>,
}



const Context = createContext<ContextType | undefined>(undefined);
const PdfObjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const { pdfObject,addPdfObject } = usePdfObjectStatus();
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

  const contextValue: ContextType = {
    pdfObject:pdfObject,
    addPdfObject:addPdfObject,
    canvasSize:canvasSize,
    setCanvasSize:setCanvasSize
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const usePdfObjectContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { PdfObjectProvider, usePdfObjectContext };
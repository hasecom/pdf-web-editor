'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';
import usePdfObjectStatus from '@/hooks/usePdfObjectStatus';
import { pdfWrapType } from '@/components/pdfOverlap/pdfObjectLink';

interface ContextType{
  pdfObject:pdfWrapType[],
  addPdfObject:(pdfObjectItem:pdfWrapType)=>void
}
type ProviderProps = {
  children: ReactNode;
};

const Context = createContext<ContextType | undefined>(undefined);
const PdfObjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const { pdfObject,addPdfObject } = usePdfObjectStatus();
  const contextValue: ContextType = {
    pdfObject:pdfObject,
    addPdfObject:addPdfObject
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
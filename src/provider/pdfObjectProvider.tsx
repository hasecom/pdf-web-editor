'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import usePdfObjectStatus from '@/hooks/usePdfObjectStatus';
import { pdfWrapType,pdfTextLinkInitType } from '@/constant/pdfObjectConstant'
import usePdfTextStatus from "@/hooks/usePdfTextStyle";

type ProviderProps = {
  children: ReactNode;
};

interface ContextType{
  pdfObject:pdfWrapType[],
  addPdfObject:(pdfObjectItem:pdfWrapType)=>void,
	setPdfObject:React.Dispatch<React.SetStateAction<pdfWrapType[]>>,
  pdfTextInit:pdfTextLinkInitType
}

const Context = createContext<ContextType | undefined>(undefined);

/**
 * PDF描画のオブジェクトのプロバイダーです。
 *
 * @param {{ children: any; }} param0
 * @param {*} param0.children
 * @returns {*}
 */
const PdfObjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const { pdfObject,addPdfObject,setPdfObject } = usePdfObjectStatus();
  const { pdfTextInit } = usePdfTextStatus();
  const contextValue: ContextType = {
    pdfObject:pdfObject,
    addPdfObject:addPdfObject,
		setPdfObject:setPdfObject,
    pdfTextInit:pdfTextInit
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
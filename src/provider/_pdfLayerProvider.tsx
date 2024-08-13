'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ContextType {
}
type ProviderProps = {
  children: ReactNode;
};

const Context = createContext<ContextType | undefined>(undefined);

/**
 * PDFレイヤーのプロバイダー
 *
 * @param {{ children: any; }} param0
 * @param {*} param0.children
 * @returns {*}
 */
const PdfLayerProvider: React.FC<ProviderProps> = ({ children }) => {

  const contextValue: ContextType = {

  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const usePdfLayerContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { PdfLayerProvider, usePdfLayerContext };
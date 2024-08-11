'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ContextType {
  layerItems: string[],
  setLayerItems:React.Dispatch<React.SetStateAction<string[]>>,
  addLayerItem:(layerItem:string)=>void,
  removeLayerItem:(index:number)=>void
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
  const [layerItems, setLayerItems] = useState<string[]>([]);
  
  const addLayerItem = (layerItem:string):void => {
    setLayerItems([...layerItems, layerItem]);
  };
  const removeLayerItem = (index:number):void => {
    const newItems = layerItems.filter((_, i) => i !== index);
    setLayerItems(newItems);
  };
  const contextValue: ContextType = {
    layerItems: layerItems,
    setLayerItems:setLayerItems,
    addLayerItem:addLayerItem,
    removeLayerItem:removeLayerItem
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
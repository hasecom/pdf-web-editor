// import React, { createContext, useContext, ReactNode } from 'react';


// interface ContextType {
// 	breadCrumbValue:any
// }
// type ProviderProps = {
//   children: ReactNode;
// };

// const Context = createContext<ContextType | undefined>(undefined);
// const PdfProvider: React.FC<ProviderProps> = ({ children }) => {
// 	//const {breadCrumbValue} = useBreadCrumb();
//  const [scrollY, setScrollY] = useState(0);
// 	const contextValue: ContextType = {
// 		breadCrumbValue:breadCrumbValue
//   };

//   return <Context.Provider value={contextValue}>{children}</Context.Provider>;
// };

// const useBreadCrumbContext = (): ContextType => {
//   const context = useContext(Context);
//   if (!context) {
//     throw new Error('useMyContext must be used within a MyProvider');
//   }
//   return context;
// };

// export { BreadCrumbProvider, useBreadCrumbContext };
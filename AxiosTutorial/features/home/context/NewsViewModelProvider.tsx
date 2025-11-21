import React , { createContext } from "react";
import { useNewsViewModel } from "../viewModel/HomeViewModel";


export const NewsVMContext = createContext<any>(null)


export const NewsViewModelProvider = ({ children }: any)=>{
    const vm = useNewsViewModel()
    return <NewsVMContext.Provider value={vm}>
        {children}
    </NewsVMContext.Provider>    
}


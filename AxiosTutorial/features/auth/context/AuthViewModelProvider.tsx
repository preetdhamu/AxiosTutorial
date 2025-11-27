import { createContext } from "react"
import { useLoginViewModel } from "../viewModel/AuthViewModel"

export const AuthVMContext = createContext<any>(null)


export const AuthViewModelProvider = ({ children }: any)=>{
    const vm = useLoginViewModel()
    return <AuthVMContext.Provider value={vm}>
        {children}
    </AuthVMContext.Provider>    
}


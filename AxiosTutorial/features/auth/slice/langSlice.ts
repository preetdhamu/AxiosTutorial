import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LangState } from "../models/langStateModel";


export const initialState: LangState = {
    selectedAppLanguage: null
};


const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLangauage : (state , action : PayloadAction<string | null>)=>{
            state.selectedAppLanguage = action.payload; 
        },
        clearLanguage : (state)=>{
            state.selectedAppLanguage = 'en';       
        }
    }
});


export const {
    setLangauage ,
    clearLanguage
} = langSlice.actions;



export default langSlice.reducer;


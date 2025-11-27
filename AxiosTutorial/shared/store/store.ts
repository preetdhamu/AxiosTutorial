import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistConfig } from "./persistConfig";
import newsReducer from "../../features/home/slice/newsSlice";
import authReducer  from "../../features/auth/slice/authSlice";
import langReducer  from "../../features/auth/slice/langSlice";

import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const combinedReducer = combineReducers({
  news: newsReducer,
  auth: authReducer,
  lang: langReducer
});

const rootReducer = persistReducer(persistConfig, combinedReducer);


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistConfig } from "./persistConfig";
import newsReducer from "./slices/home/newsSlice";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



const combinedReducer = combineReducers({
  news: newsReducer,
  auth: authReducer,
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
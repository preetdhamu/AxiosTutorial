import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistConfig } from "./persistConfig";
import newsReducer from "./slices/newsSlice";
import { persistReducer, persistStore } from "redux-persist";




const combinedReducer = combineReducers({
  news: newsReducer,  
});

const rootReducer = persistReducer(persistConfig, combinedReducer);


export const store = configureStore({
  reducer: rootReducer,
  middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck : false ,
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
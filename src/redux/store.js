import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import scategoriesReducer from "../features/scategorieSlice"
import {cartReducer,cartMiddleware } from "../features/cartSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliser le stockage local


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, articlesReducer);

const store = configureStore({
  reducer: {
    storearticles:persistedReducer,
    storescategories: scategoriesReducer,
    storecart : cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
})
export const persistor = persistStore(store);

export default store

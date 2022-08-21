import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
 // import thunk from 'redux-thunk';
//reducers
import authReducer   from '@actions/authSlice';
import categoryReducer from '@actions/categorySlice';
import productReducer from "@actions/productSlice";

import { useMemo } from "react";

const persistConfig = {
   key: 'primary',
   storage,
   blacklist:['others', 'entities']
}

let store

const rootReducer = combineReducers({
   auth       : authReducer,
   categories : categoryReducer,
   products   : productReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

function makeStore(preloadedState = {}) {
   return configureStore({
      reducer: persistedReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: {
               ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
         }),
   })
}


export const initializeStore = (preloadedState) => {
   let _store = store ?? makeStore(preloadedState);

   if (preloadedState && store) {
      _store = makeStore({
         ...store.getState(),
         ...preloadedState,
      });
      store = undefined;
   }

   if (typeof window === 'undefined') return _store;
   if (!store) store = _store;
   return _store;
};

export function useStore(initialState) {
   const store = useMemo(() => initializeStore(initialState), [initialState]);
   return store;
}

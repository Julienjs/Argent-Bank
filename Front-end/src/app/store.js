import { configureStore } from "@reduxjs/toolkit"
import usersReducer from '../feature/user/usersSlice'
import authReducer from "../feature/auth/authSlice"
import accountReducer from "../feature/accountSlice"
import transactionReducer from "../feature/transactionSlice"
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { combineReducers } from "redux";

const reducers = combineReducers({
    auth: authReducer,
    user: usersReducer,
    account: accountReducer,
    transaction: transactionReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export const persistor = persistStore(store);
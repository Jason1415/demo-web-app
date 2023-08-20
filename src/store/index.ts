import { combineReducers } from 'redux';
import auth from './auth/reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const createRootReducer = combineReducers({
    auth
});

export const store = configureStore({
    reducer: createRootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        // immutableCheck: false
    }),
});

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;

import { IAuthState } from '../store/auth/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { createRootReducer } from '../store';
import { Draft } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

export type DispatchCall<P> = (payload : P) => void;
export type DispatchCallEmpty = () => void;

export interface INotification {
    message : string | React.ReactNode;
    options ?: Draft<OptionsObject>;
}

export interface ISnackbarNotification extends INotification {
    key : number;
}

export type RootState = ReturnType<typeof createRootReducer>;

export interface IRootState {
    auth : IAuthState;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

export type ThunkApi = {
    dispatch : AppDispatch;
    state : RootState;
};
